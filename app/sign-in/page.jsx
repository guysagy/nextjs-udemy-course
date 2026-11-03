import Heading from '@/components/Heading';
import SignInForm from '@/components/SignInForm';

export const metadata = {
    title: 'Sign In',
}

export default function SignInPage() {
    return (
        <>
            <Heading>Sign In</Heading>
            <p className="mt-1">
                Don't have an account?{' '}
                <a href="/sign-up" className="text-orange-700 hover:underline">
                    Sign up
                </a>
            </p>
            <SignInForm />
        </>
    );
}