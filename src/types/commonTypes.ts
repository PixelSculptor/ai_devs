export type TaskNameType = {
    taskName: string | undefined;
};

export type TaskResponse = {
    code: number;
    msg: string;
    input: string[] | string;
    data?: unknown;
    question?: string;
    hint?: string;
    url?: string;
};

export type ImageMetadata = TaskResponse & {
    text: string;
    image: string;
    service: string;
};

export type ImageResponse = {
    requestId: string;
    href: string;
};
