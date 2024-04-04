export type ArticleLink = {
    title: string;
    url: string;
    info: string;
    date: string;
};

export type ArticleLinkMetadata = Omit<ArticleLink, 'info'> & { id: string };

function isArticleLink(article: unknown): article is ArticleLink {
    if (typeof article !== 'object' || article === null) {
        return false;
    }
    return (
        (article as ArticleLink).date !== undefined &&
        (article as ArticleLink).info !== undefined &&
        (article as ArticleLink).title !== undefined &&
        (article as ArticleLink).url !== undefined
    );
}

export async function getArticleLinks(url: string): Promise<ArticleLink[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Chrome',
                },
            });
            if (!response.ok) {
                throw new Error('Error while fetching data');
            }
            const data = await response.json();
            if (!Array.isArray(data) || !data.every(isArticleLink)) {
                throw new Error('Invalid data format');
            }
            const links = data;
            resolve(links);
        } catch (error) {
            reject(error);
        }
    });
}
