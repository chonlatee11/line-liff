import { db } from "../connections/mongo"
import { BlockUserRequestBody } from "../interfaces/chats.interfaces";
import { MessageDataBody } from "../interfaces/users.interfaces";

const blockedUsersCollection = db.collection('blocked_users');
const chatsCollection = db.collection('chats');

export function Block(req: BlockUserRequestBody) {
    const { userId } = req;
    const insertResult = blockedUsersCollection.insertOne({
        userId
    });
    return insertResult;
}

export function Unblock(req: BlockUserRequestBody) {
    const { userId } = req;
    const deleteResult = blockedUsersCollection.deleteOne({
        userId
    });
    return deleteResult;
}

export function GetBlockedUsers() {
    const blockedUsers = blockedUsersCollection.find();
    return blockedUsers;
}

export function saveMessage(messageData: MessageDataBody) {
    const insertResult = chatsCollection.insertOne(messageData);
    return insertResult;
}