import { Elysia, t } from "elysia";
import { BlockUserRequestBody } from "../interfaces/chats.interfaces";
import { Block } from "../usecase/chats.usecase";

export const chatsController = new Elysia({ prefix: '/chats' })
    .post('/block', async ({ body }) => {
        try {
            const req = body as BlockUserRequestBody;
            const user = await Block(req);
            return user;
        } catch (error) {
            return {
                message: 'Unable to block user!',
                status: 500,
            };
        }
    }, {
        body: t.Object({
            userId: t.String(),
        },
            {
                error: {
                    message: 'Invalid request body!',
                    status: 400,
                }
            }
        ),
    }
    )