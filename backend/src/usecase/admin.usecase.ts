import { ObjectId, db } from "../connections/mongo"
import { RegisterRequestBody } from "../interfaces/admin.interfaces";

const adminCollection = db.collection('admins');

export function Register (req: RegisterRequestBody) {
    const { username, password } = req;
    const insertResult = adminCollection.insertOne({
        username
        , password
    });
    return insertResult;
}

export function Login (req: RegisterRequestBody) {
    const { username, password } = req;
    const user = adminCollection.findOne({
        username
        , password
    });
    return user;
}

export function GetProfile (id: string) {
    const user = adminCollection.findOne({ _id: new ObjectId(id) });
    return user;
}