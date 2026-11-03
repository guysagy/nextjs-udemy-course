import { hash } from 'bcrypt';
import { db } from './db';

export async function authenticateUser(email, password) {
    const user = await db.user.findUnique({
        where: { email },
        select: { email: true, name: true }
    });
    if (user && await compare(password, user.passwordHash)) {
        return { user, error: null };
    } else {
        return { user: null, error: 'Invalid email or password' };
    }
}

export async function createUser({ email, name , password }) {
    try {
        const passwordHash = await hash(password, 10);
        const user = await db.user.create({
            data: { email, name , passwordHash },
            omit: { passwordHash: true },
        });
        return { user, error: null };
    } catch (error) {
        console.error('Error creating user:', error);
        return { user: null, error: `Failed to create user ${error.message}` };
    }
}
