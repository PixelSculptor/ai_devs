export type TaskNameType = {
    taskName: string | undefined;
};

export type TaskResponse = {
    code: number;
    msg: string;
    input: string[];
    data?: unknown;
    question?: string;
    hint?: string;
};
