import { Document } from 'mongodb';

export interface Admin extends Document {
  username: string;
  password: string;
}




