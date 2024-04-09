import { CountryPopulation } from './ICountry';
import { TypeCurrency } from './ICurrency';
import { isCountry, isNBPResponse } from './helpers';

const COUNTRY_INFO = 'https://restcountries.com/v3.1/name';

const CURRENCY_URL = 'https://api.nbp.pl/api/exchangerates/tables/A';

export const getCountryCurrencyValue = async (
    currencyCode: string,
): Promise<TypeCurrency> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(CURRENCY_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Error');
            }
            const data = await response.json();
            if (!Array.isArray(data) || !isNBPResponse(data[0])) {
                throw new Error('Wrong response type');
            }
            const { rates } = data[0];
            const currency = rates.find(
                (rate: TypeCurrency) => rate.code === currencyCode,
            );
            if (!currency) {
                throw new Error('Currency not found');
            }
            console.log('Currency: ', currency);
            resolve(currency);
        } catch (error) {
            if (error instanceof Error) {
                reject(error.message);
            } else {
                reject(error);
            }
        }
    });
};

export const getInfoAboutCountry = async (
    country: string,
): Promise<CountryPopulation> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${COUNTRY_INFO}/${country}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Error. Request failure');
            }
            const data = await response.json();
            if (!Array.isArray(data) || !isCountry(data[0])) {
                throw new Error('Wrong response type');
            }
            const {
                population,
                name: { common },
            } = data[0];

            const populationCountry: CountryPopulation = {
                name: common,
                population,
            };
            resolve(populationCountry);
        } catch (error) {
            if (error instanceof Error) {
                reject(error.message);
            } else {
                reject(error);
            }
        }
    });
};
