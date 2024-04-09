export type NBPResponse = {
    effectiveDate: string;
    no: string;
    rates: TypeCurrency[];
    table: string;
};

export type TypeCurrency = {
    code: string;
    currency: string;
    mid: number;
};
