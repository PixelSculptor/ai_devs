type FunctionNames = 'matchTool';

export type Category = 'ToDo' | 'Calendar';

export type Task = {
    tool: Category;
    desc: string;
    date?: string;
};

export type ITools = {
    [K in FunctionNames]: (...args: any[]) => Task;
};
