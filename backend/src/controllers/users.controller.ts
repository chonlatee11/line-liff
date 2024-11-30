import { Elysia, t } from "elysia";
import { Register, Login, GetProfile, Logout } from "../usecase/users.usecase";
import { UserLoginRequestBody, UserLogoutRequestBody, UserRegisterRequestBody } from "../interfaces/users.interfaces";

export const usersController = new Elysia({ prefix: '/users' })
    .post('/login', async ({ body }) => {
        try {
            const req = body as UserLoginRequestBody;
            const user = await Login(req);
            return {
                message: 'User logged in successfully!',
                status: 200,
                data: user,
            };
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
    .post('/logout', async ({body}) => {
        try {
            const req = body as UserLogoutRequestBody;
            Logout(req);
        } catch (error) {
            return {
                message: 'Unable to logout!',
                status: 500,
            };
        }
    },
        {
            body: t.Object({
                lineuserid: t.String(),
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
    .post('/register', async ({ body }) => {
        try {
            const req = body as UserRegisterRequestBody;
            const users = await Register(req);
            return {
                message: 'User created successfully!',
                status: 200,
                data: users,
            };
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
                email: t.String({ format: 'email' }),
                name: t.String(),
                lastname: t.String(),
                lineuserid: t.String(),
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
            return {
                message: 'User profile retrieved successfully!',
                status: 200,
                data: user,
            }
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