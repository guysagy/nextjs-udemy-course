import  Heading from '@/components/Heading';
import Link from 'next/link';

export default function ReviewsPage() {
    return (
        <div>
            <Heading>Reviews</Heading>
            <ul>
                <li>
                    <Link href="/reviews/stardew-valley">Stardew Valley Reviews</Link>
                </li>
                <li>
                    <Link href="/reviews/hollow-night">Hollow Night Reviews</Link>
                </li>
            </ul>
        </div>
    )
}