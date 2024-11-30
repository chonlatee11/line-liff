
import { createHash } from 'crypto';
import { SALT_ROUNDS } from './settings';

export function hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const hash = createHash('sha256');
            hash.update(password + SALT_ROUNDS);
            const hashedData = hash.digest('hex');
            resolve(hashedData);
        } catch (err) {
            reject(err);
        }
    });
}

export function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        try {
            const hash = createHash('sha256');
            hash.update(password + SALT_ROUNDS);
            const hashedData = hash.digest('hex');
            resolve(hashedData === hashedPassword);
        } catch (err) {
            reject(err);
        }
    });
}