import crypto from 'crypto';

export const validateSignature = (body: any, signature: string): boolean => {
    const hash = crypto
        .createHmac('sha256', process.env.LINE_CHANNEL_SECRET as string)
        .update(JSON.stringify(body))
        .digest('base64');
    return hash === signature;
};