export interface UserRegisterRequestBody {
    username: string;
    password: string;
    name?: string;
    lastname?: string;
    email?: string;
    lineuserid?: string;
}

export interface UserLoginRequestBody {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    password: string;
    name: string;
    lastname: string; // Include lastname
    email: string;
    lineuserid: string;
}

export interface UserLogoutRequestBody {
    lineuserid: string;
}

export interface MessageDataBody {
    id?: string;
    userId: string;
    message?: string;
    type?: string;
    timestamp?: number;
}