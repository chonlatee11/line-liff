import { Elysia } from "elysia";
import { saveMessage } from "../usecase/chats.usecase";
import { LINE_CHANEL_SECRET } from "../utils/settings";
import crypto from 'crypto';
import { MessageDataBody } from "../interfaces/users.interfaces";

export const webhookController = new Elysia().group('/webhook', (app) => {
    return app
        .guard(
            {
                beforeHandle({ set, headers, body }) {
                    const signature = headers['x-line-signature'];
                    if (!signature) {
                        // Signature is missing, return Unauthorized status
                        set.status = 401; // Unauthorized
                        return { message: 'Signature missing' };
                    }
                    const hash = crypto
                        .createHmac('sha256', LINE_CHANEL_SECRET)
                        .update(JSON.stringify(body))
                        .digest('base64');
                    // Compare the generated hash with the signature
                    if (hash !== signature) {
                        // Invalid signature
                        set.status = 400; // Bad Request
                        return { message: 'Invalid signature!' };
                    }
                }
            }
        )
        .post('/line', async ({ body, headers }) => {
            const { events } = body as WebhookRequestBody; 
            // Return a success response
            events.forEach(async (event) => {
                const { type, message, source } = event;

                if (type === 'message' && message.type === 'text') {
                    console.log(`Received message: ${message.text}`);
                    // จัดเก็บข้อความใน MongoDB
                    const messageData: MessageDataBody = {
                        id: event.message.id,
                        userId: source.userId,
                        message: message.text,
                        type: message.type,
                        timestamp: event.timestamp,
                    };
                    await saveMessage(messageData);
                    
                } else if (type === 'message' && message.type === 'image') {
                    console.log('Received image message');
                    await saveMessage({
                        id: event.message.id,
                        userId: source.userId,
                        type: message.type,
                        timestamp: event.timestamp,
                    });
                }
            });
        });
});
