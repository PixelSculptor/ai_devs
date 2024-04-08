import { type PersonKnowledgeBase } from './getData';

export const transformPerson = (person: PersonKnowledgeBase) => {
    return `Imię ${person.imie}, nazwisko ${person.nazwisko}, wiek ${person.wiek}, o mnie ${person.o_mnie}, ulubiona postać z Kapitana Bomby ${person.ulubiona_postac_z_kapitana_bomby}, ulubiony serial ${person.ulubiony_serial}, ulubiony film ${person.ulubiony_film}, ulubiony kolor ${person.ulubiony_kolor}`;
};
