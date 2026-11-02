import { signoutAction } from '@/app/sign-in/actions';

export default async function SignOutButton() {
    return (
        <form action={signoutAction}>
            <button
                type="submit"
                className="text-orange-800 hover:underline"
            >
                Sign out
            </button>
        </form>
    );
}