import { db } from './db';

export async function createUser({ email, name , password }) {
    try {
        const user = await db.user.create({
            data: { email, name , password },
            omit: { password: true },
        });
        return { user, error: null };
    } catch (error) {
        console.error('Error creating user:', error);
        return { user: null, error: `Failed to create user ${error.message}` };
    }
}
