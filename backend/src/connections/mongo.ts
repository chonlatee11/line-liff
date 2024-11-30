import { MongoClient, ObjectId } from 'mongodb';
import { MONGODB_PORT, MONGODB_USER, MONGODB_PASS, MONGODB_URI, MONGODB_DB } from '../utils/settings'
import type { WithId } from 'mongodb';

const uri = `mongodb://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_URI}:${MONGODB_PORT}`;
const client = new MongoClient(uri);
const db = client.db(MONGODB_DB);

export { db, ObjectId, WithId };
