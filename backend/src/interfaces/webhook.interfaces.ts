type LineEvent = {
    type: string;
    message: {
        type: string;
        text?: string;
        id?: string;
    };
    source: {
        userId: string;
    };
    replyToken: string;
    timestamp: number;
};

type WebhookRequestBody = {
    events: LineEvent[];
};