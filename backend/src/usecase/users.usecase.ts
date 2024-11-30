import { ObjectId, WithId, db } from "../connections/mongo"
import { UserLoginRequestBody, UserRegisterRequestBody, User, UserLogoutRequestBody } from "../interfaces/users.interfaces";
import { comparePasswords, hashPassword } from "../utils/hash";
import { LOGIN_RICH_MENU_ID, LINE_BOT_BASE_URL, LINE_CHANEL_ACCESS_TOKEN } from "../utils/settings";
import axios from 'axios';

const usersCollection = db.collection('users');

export async function Login(req: UserLoginRequestBody) {
    const { username, password } = req;

    const user = await usersCollection.findOne({ username });
    if (!user) {
        return { status: 'error', message: 'Invalid username or password' };
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
        return { status: 'error', message: 'Invalid username or password' };
    }

    try {
        const res = await axios.post(`${LINE_BOT_BASE_URL}/user/${user.lineuserid}/richmenu/${LOGIN_RICH_MENU_ID}`, {}, {
            headers: {
                'Authorization': `Bearer ${LINE_CHANEL_ACCESS_TOKEN}`
            }
        });
        console.log(res.data);
    }
    catch (error) {
        console.log(error);
    }


    return user;
}

export async function Register(req: UserRegisterRequestBody) {
    const { username, password, name, lastname, email, lineuserid } = req;
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
        return { status: 'error', message: 'Username already exists' };
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
        username,
        password: hashedPassword,
        name,
        lastname,
        email,
        lineuserid
    };

    const insertResult = usersCollection.insertOne(newUser);
    return insertResult;
}

async function getUserById(id: string): Promise<WithId<User> | null> {
    const userDocument = await usersCollection.findOne({ lineuserid: id });
    if (userDocument) {
        const user: WithId<User> = {
            _id: userDocument._id.toString(),
            username: userDocument.username,
            password: userDocument.password,
            name: userDocument.name,
            lastname: userDocument.lastname,
            email: userDocument.email,
            lineuserid: userDocument.lineuserid
        };
        return user;
    } else {
        return null;
    }
}

export async function Logout(req: UserLogoutRequestBody) {
    const { lineuserid } = req;
    const user = await getUserById(lineuserid);

    if (!user) {
        return { status: 'error', message: 'User not found' };
    }
    try{
        const res = await axios.delete(`${LINE_BOT_BASE_URL}/user/${user.lineuserid}/richmenu`, {
            headers: {
                'Authorization': `Bearer ${LINE_CHANEL_ACCESS_TOKEN}`
            }
        });
        console.log(res.data);
    }catch(error){
        console.log(error);
    }

    return { status: 'success', message: 'User logged out' };
}

export async function GetProfile(id: string) {
    const user = await getUserById(id);

    if (!user) {
        return { status: 'error', message: 'User not found' };
    }

    return user;
}