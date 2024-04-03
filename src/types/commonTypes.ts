export type TaskNameType = {
    taskName: string | undefined
}


export type TaskResponse = {
    code: number;
    msg: string;
    input: string[];
    question?: string;
    hint?: string;
}