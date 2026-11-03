'use server';

import { redirect } from 'next/navigation';
import { setSessionCookie, deleteSessionCookie } from '@/lib/auth';
import { authenticateUser } from '@/lib/user';

export async function signinAction(formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('isAction , formData = ', email, password);
    const { user, error } = await authenticateUser(email, password);
    if (!user) {
        return { isError: true, message: 'Invalid email or password' };
    }
    await setSessionCookie(user);
    redirect('/');
}

export async function signoutAction() {
    await deleteSessionCookie();
}
