export type FunctionNames = 'getCountryCurrencyValue' | 'getInfoAboutCountry';

export type ITools = {
    [K in FunctionNames]: (...args: any[]) => any;
};
