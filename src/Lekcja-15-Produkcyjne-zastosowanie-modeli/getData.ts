export type Person = {
    imie: string;
    nazwisko: string;
    wiek: number;
    o_mnie: string;
    ulubiona_postac_z_kapitana_bomby: string;
    ulubiony_serial: string;
    ulubiony_film: string;
    ulubiony_kolor: string;
};

export type PersonKnowledgeBase = { bio: string } & Person;
export type PersonMetadata = Omit<Person, 'bio'> & { id: string };

export function isPerson(data: unknown): data is Person {
    return (
        (data as Person).imie !== undefined &&
        (data as Person).nazwisko !== undefined &&
        (data as Person).wiek !== undefined &&
        (data as Person).o_mnie !== undefined &&
        (data as Person).ulubiona_postac_z_kapitana_bomby !== undefined &&
        (data as Person).ulubiony_serial !== undefined &&
        (data as Person).ulubiony_film !== undefined &&
        (data as Person).ulubiony_kolor !== undefined
    );
}

export async function getData(url: string): Promise<PersonKnowledgeBase[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                if (!Array.isArray(data) || !data.every(isPerson)) {
                    throw new Error('Data is not a Person type');
                }
                const peopleKnowledgeBase = data.map((person: Person) => {
                    return {
                        ...person,
                        bio: `Jestem ${person.imie} ${person.nazwisko}. ${person.o_mnie}. ${person.ulubiony_kolor}`,
                    };
                });
                resolve(peopleKnowledgeBase);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            reject(error);
        }
    });
}
