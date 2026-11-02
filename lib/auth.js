import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const JWT_COOKIE = 'sessionToken';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getUserFromSession() {
    const sessionTokenCookie = cookies().get(JWT_COOKIE);
    if (sessionTokenCookie) {
        try {
            const { payload } = await jwtVerify(sessionTokenCookie.value, JWT_SECRET);
            console.log('payload = ', payload);
            return payload;
        } catch (error) {
            console.error('Invalid JWT', error);
        }
    }
}

export async function setSessionCookie(user) {
    const sessionToken = await new SignJWT(user)
        .setProtectedHeader({alg: 'HS256'})
        .sign(JWT_SECRET)

    cookies().set(JWT_COOKIE, sessionToken);
}