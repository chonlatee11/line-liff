import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
import { PORT, SOCKET_PORT } from "./utils/settings";
import { adminController } from "./controllers/admin.controller";
import { chatsController } from "./controllers/chats.controller";
import { usersController } from "./controllers/users.controller";
import { webhookController } from "./controllers/linewebhook.controller";

const app = new Elysia();
const socket = new Elysia();
app.use(cors())
app.use(adminController);
app.use(chatsController);
app.use(usersController);
app.use(webhookController);

app.listen(PORT, () => {
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
});

socket.listen(SOCKET_PORT, () => {
  `🦊 Elysia is running at ${socket.server?.hostname}:${socket.server?.port}`
});


