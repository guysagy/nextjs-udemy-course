'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode('some-random-string');

export async function signinAction(formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('isAction , formData = ', email, password);
    const user = authenticate(email, password);
    if (!user) {
        return { isError: true, message: 'Invalid credentials' };
    }

    const sessionToken = await new SignJWT(user)
        .setProtectedHeader({alg: 'HS256'})
        .sign(JWT_SECRET)

    cookies().set('sessionToken', sessionToken);
    redirect('/');
}

function authenticate(email, password) {
    if (email.endsWith('@example.com') && password === 'test') {
        return { email };
    }
}