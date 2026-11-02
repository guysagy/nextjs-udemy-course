'use server';

import { redirect } from 'next/navigation';
import { setSessionCookie } from '@/lib/auth';

export async function signinAction(formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('isAction , formData = ', email, password);
    const user = authenticate(email, password);
    if (!user) {
        return { isError: true, message: 'Invalid credentials' };
    }
    await setSessionCookie(user);
    redirect('/');
}

function authenticate(email, password) {
    if (email.endsWith('@example.com') && password === 'test') {
        return { email };
    }
}