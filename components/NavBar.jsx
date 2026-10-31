import { cookies } from 'next/headers';
import NavLink from './NavLink';

export default function NavBar() {
    const userCookie = cookies().get("user");
    const user = userCookie ? JSON.parse(userCookie.value) : null;
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