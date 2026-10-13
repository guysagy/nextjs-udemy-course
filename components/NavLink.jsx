'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, prefetch, children }) {
    const pathName = usePathname();
    if (pathName === href) {
        return (
            <span className="text-orange-800 font-bold">
                {children}
            </span>
        );
    }
    return (
        <Link href={href}
            prefetch={prefetch}
            className="text-orange-800 hover:underline">
            {children}
        </Link>
    );
}
