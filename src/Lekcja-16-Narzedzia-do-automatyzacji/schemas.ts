export const currencyValueSchema = {
    name: 'getCountryCurrencyValue',
    description: 'Get currency value for given country',
    parameters: {
        type: 'object',
        properties: {
            currencyCode: {
                type: 'string',
                description: 'Provide currency code',
            },
        },
    },
    required: ['currency'],
};

export const countryInfoSchema = {
    name: 'getInfoAboutCountry',
    description: 'Get information about country.',
    parameters: {
        type: 'object',
        properties: {
            population: {
                type: 'string',
                description: 'Provide country name in English',
            },
        },
    },
    required: ['population'],
};
