import { db } from './db';

export async function createUser({ email, name , password }) {
    return await db.user.create({
        data: { email, name , password }
    });
}
