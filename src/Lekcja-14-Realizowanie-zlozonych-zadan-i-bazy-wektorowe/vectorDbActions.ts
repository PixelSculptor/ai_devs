import { Document } from 'langchain/document';
import { OpenAIEmbeddings } from '@langchain/openai';
import { v4 as uuidv4 } from 'uuid';
import { QdrantClient } from '@qdrant/js-client-rest';
import type { ArticleLink, ArticleLinkMetadata } from './getArticleLinks';

const COLLECTION_NAME = 'unknown_Links';

const qdrant = new QdrantClient({ url: Bun.env.QDRANT_URL });
const embeddings = new OpenAIEmbeddings({ maxConcurrency: 5 });

export async function importDataToDB(links: ArticleLink[]) {
    return new Promise(async (resolve, reject) => {
        try {
            const resultCollections = await qdrant.getCollections();
            const indexed = resultCollections.collections.find(
                (collection) => collection.name === COLLECTION_NAME,
            );
            if (!indexed) {
                await qdrant.createCollection(COLLECTION_NAME, {
                    vectors: { size: 1536, distance: 'Cosine', on_disk: true },
                });
            }
            let documents: Document[] = [];
            const collectionInfo = await qdrant.getCollection(COLLECTION_NAME);

            if (collectionInfo.points_count === links.length) {
                resolve(true);
            }

            if (!collectionInfo.points_count) {
                // Read data:
                documents = links.map((link: ArticleLink) => {
                    return new Document({
                        pageContent: link.info,
                        metadata: {
                            title: link.title,
                            url: link.url,
                            date: link.date,
                            id: uuidv4(),
                        } as ArticleLinkMetadata,
                    });
                });
            }
            // Generate embeddings:
            const points = [];
            for (const document of documents) {
                const [embedding] = await embeddings.embedDocuments([
                    document.pageContent,
                ]);
                points.push({
                    id: document.metadata.id,
                    payload: document.metadata,
                    vector: embedding,
                });
            }
            // Indexing data:
            await qdrant.upsert(COLLECTION_NAME, {
                wait: true,
                batch: {
                    ids: points.map((point) => point.id),
                    vectors: points.map((point) => point.vector),
                    payloads: points.map((point) => point.payload),
                },
            });
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
}

export async function search(query: string) {
    return new Promise(async (resolve, reject) => {
        try {
            const queryEmbedding = await embeddings.embedQuery(query);
            const searchResult = await qdrant.search(COLLECTION_NAME, {
                vector: queryEmbedding,
                limit: 1,
            });
            console.log('Search result:', searchResult);
            resolve((searchResult[0].payload as ArticleLinkMetadata).url);
        } catch (error) {
            reject(error);
        }
    });
}
