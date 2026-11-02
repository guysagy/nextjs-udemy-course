import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const JWT_COOKIE = 'sessionToken';
const JWT_DURATION = 14 * 24 * 60 * 60 * 1000; // 2 weeks
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getUserFromSession() {
    const sessionToken = cookies().get(JWT_COOKIE)?.value;
    if (sessionToken) {
        try {
            const { payload } = await jwtVerify(sessionToken, JWT_SECRET);
            console.log('payload = ', payload);
            return payload;
        } catch (error) {
            console.error('Invalid JWT', error);
        }
    }
}

export async function setSessionCookie(user) {
    const expirationTime = new Date(Date.now() + JWT_DURATION);
    const sessionToken = await new SignJWT(user)
        .setProtectedHeader({alg: 'HS256'})
        .setExpirationTime(expirationTime)
        .sign(JWT_SECRET)

    cookies().set(JWT_COOKIE, sessionToken, {
        expires: expirationTime,
        httpOnly: true,
        sameSite: 'lax',
    });
}

export async function deleteSessionCookie() {
    cookies().delete(JWT_COOKIE);
}