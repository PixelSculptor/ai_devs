export type FunctionNames = 'addUser';

export type User = {
    name: string;
    surname: string;
    year: number;
};

export type ITools = {
    [K in FunctionNames]: (...args: any[]) => User;
};
