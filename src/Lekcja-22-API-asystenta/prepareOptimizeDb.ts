import { prepareShortPersonalBio } from './prepareShortPersonalBio';

type PersonName = 'zygfryd' | 'ania' | 'stefan';

type PeopleDB = {
    [key in PersonName]: string[];
};

// type Guard for Person json object:
function isPeopleDB(person: unknown): person is PeopleDB {
    if (typeof person !== 'object' || person === null) {
        return false;
    }
    for (const key in person as PeopleDB) {
        if (!['zygfryd', 'ania', 'stefan'].includes(key)) {
            return false;
        }
        if (!Array.isArray((person as PeopleDB)[key as PersonName])) {
            return false;
        }
        if (
            !(person as PeopleDB)[key as PersonName].every(
                (el) => typeof el === 'string',
            )
        ) {
            return false;
        }
    }
    return true;
}

export async function prepareOptimizeDb(
    url = 'https://tasks.aidevs.pl/data/3friends.json',
): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (!isPeopleDB(data)) {
                throw new Error('Invalid data format');
            }
            const peopleShortenedBioPromises = Object.keys(data).map(
                async (key) => {
                    const bio = await prepareShortPersonalBio(
                        data[key as PersonName],
                    );
                    return `###${key}: ${bio}\n`;
                },
            );
            const peopleShortenedBio = await Promise.all(
                peopleShortenedBioPromises,
            );
            resolve(peopleShortenedBio.join('\n'));
        } catch (error) {
            reject(error);
        }
    });
}
