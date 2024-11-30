import { Elysia, t } from "elysia";
import { LoginRequestBody, RegisterRequestBody } from "../interfaces/admin.interfaces";
import { GetProfile, Login, Register } from "../usecase/admin.usecase";

export const adminController = new Elysia({ prefix: '/admins' })
    .post('/login', async ({ body }) => {
        try {
            const req = body as LoginRequestBody;
            const user = await Login(req);
            return user;
        } catch (error) {
            return {
                message: 'Unable to login!',
                status: 500,
            };
        }
    }, {
        body: t.Object({
            username: t.String(),
            password: t.String(),
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
    .post('/logout', () => 'Sign up')
    .post('/register', async ({ body }) => {
        try {
            const req = body as RegisterRequestBody;
            const insertResult = await Register(req);
            return insertResult;
        } catch (error) {
            return {
                message: 'Unable to create a new user!',
                status: 500,
            };
        }
    },
        {
            body: t.Object({
                username: t.String(),
                password: t.String(),
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
    .get('/profile/:id', async ({ params: { id } }) => {
        try {
            const docid = id;
            const user = await GetProfile(docid);
            return user;

        } catch (error) {
            return {
                message: 'Unable to retrieve user profile!',
                status: 500,
            };

        }
    },
        {
            params: t.Object({
                id: t.String(),
            },
                {
                    error: {
                        message: 'Invalid request parameter!',
                        status: 400,
                    }
                }
            ),
        }
    )