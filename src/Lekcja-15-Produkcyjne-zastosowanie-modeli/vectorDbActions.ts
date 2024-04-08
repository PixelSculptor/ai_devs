import { Document } from 'langchain/document';
import { OpenAIEmbeddings } from '@langchain/openai';
import { v4 as uuidv4 } from 'uuid';
import { QdrantClient } from '@qdrant/js-client-rest';
import { type PersonKnowledgeBase, type PersonMetadata } from './getData';

const COLLECTION_NAME = 'people_knowledge_base';

const qdrant = new QdrantClient({ url: Bun.env.QDRANT_URL });
const embeddings = new OpenAIEmbeddings({ maxConcurrency: 10 });

export async function importDataToDB(data: PersonKnowledgeBase[]) {
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

            if (collectionInfo.points_count === data.length) {
                console.log('Data already indexed');
                resolve(true);
            }

            if (!collectionInfo.points_count) {
                // Read data:
                console.log('Indexing data');
                documents = data.map((data: PersonKnowledgeBase) => {
                    return new Document({
                        pageContent: data.bio,
                        metadata: {
                            imie: data.imie,
                            nazwisko: data.nazwisko,
                            wiek: data.wiek,
                            o_mnie: data.o_mnie,
                            ulubiona_postac_z_kapitana_bomby:
                                data.ulubiona_postac_z_kapitana_bomby,
                            ulubiony_serial: data.ulubiony_serial,
                            ulubiony_film: data.ulubiony_film,
                            ulubiony_kolor: data.ulubiony_kolor,
                            id: uuidv4(),
                        } as PersonMetadata,
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
                console.log(`num of points: ${points.length}`);
            }
            console.log(points.length);
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

export async function search(query: string): Promise<PersonKnowledgeBase> {
    return new Promise(async (resolve, reject) => {
        try {
            const queryEmbedding = await embeddings.embedQuery(query);
            const searchResult = await qdrant.search(COLLECTION_NAME, {
                vector: queryEmbedding,
                limit: 1,
            });
            console.log('Search result:', searchResult);
            resolve(searchResult[0].payload as PersonKnowledgeBase);
        } catch (error) {
            reject(error);
        }
    });
}
