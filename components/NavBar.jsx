import NavLink from './NavLink';
import { getUserFromSession } from '@/lib/auth';

export default async function NavBar() {
    const user = await getUserFromSession();
    return (
        <nav>
            <ul className="flex gap-2">
                <li className="font-bold font-orbitron">
                    <NavLink href="/">
                        Indie Gamer
                    </NavLink>
                </li>
                <li className="ml-auto">
                    <NavLink href="/reviews">
                        Reviews
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/about" prefetch={false}>
                        About
                    </NavLink>
                </li>
                {
                    user ? (
                        <li>
                            {user.email}
                        </li>
                    ) : (
                    <NavLink href="/sign-in">
                        Sign in
                    </NavLink>
                )}
            </ul>
        </nav>
    )
}