import Heading from '@/components/Heading';
import SignInForm from '@/components/SignInForm';

export const metadata = {
    title: 'Sign In',
}

export default function SignInPage() {
    return (
        <>
            <Heading>Sign In</Heading>
            <SignInForm />
        </>
    );
}