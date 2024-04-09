import { type Country } from './ICountry';
import { type NBPResponse, type TypeCurrency } from './ICurrency';

export const isCountry = (data: unknown): data is Country => {
    const countryKeys = Object.keys(data as Country);

    return countryKeys.every((key) => key in (data as Country));
};

export const isNBPResponse = (data: unknown): data is NBPResponse => {
    return (
        (data as NBPResponse).table !== undefined &&
        (data as NBPResponse).rates !== undefined &&
        (data as NBPResponse).no !== undefined &&
        (data as NBPResponse).effectiveDate !== undefined &&
        (data as NBPResponse).rates.every(isTypeCurrency)
    );
};

const isTypeCurrency = (data: unknown): data is TypeCurrency =>
    (data as TypeCurrency).code !== undefined &&
    (data as TypeCurrency).currency !== undefined;
