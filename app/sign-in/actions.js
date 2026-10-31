'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signinAction(formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('isAction , formData = ', email, password);
    const user = authenticate(email, password);
    if (!user) {
        return { isError: true, message: 'Invalid credentials' };
    }
    cookies().set('user', JSON.stringify(user));
    redirect('/');
}

function authenticate(email, password) {
    if (email.endsWith('@example.com') && password === 'test') {
        return { email };
    }
}