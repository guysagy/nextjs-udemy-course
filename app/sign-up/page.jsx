import Heading from '@/components/Heading';
import SignUpForm from '@/components/SignUpForm';

export const metadata = {
    title: 'Sign Up',
}

export default function SignUpPage() {
    return (
        <>
            <Heading>Sign Up</Heading>
            <p className="mt-1">
                Already have an account?{' '}
                <a href="/sign-in" className="text-orange-700 hover:underline">
                    Sign in
                </a>
            </p>
            <SignUpForm />
        </>
    );
}
