'use server';

import { redirect } from 'next/navigation';
import { setSessionCookie } from '@/lib/auth';
import { createUser } from '@/lib/user';

export async function signupAction(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('isAction , formData = ', name, email, password);
    const { user, error } = await createUser({ email, name, password });
    if (!user) {
        return { isError: true, message: 'Failed to create user' };
    }
    redirect('/sign-in');
}
