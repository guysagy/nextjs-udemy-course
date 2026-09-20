import  Heading from '@/components/Heading';
import Link from 'next/link';

export default function ReviewsPage() {
    return (
        <div>
            <Heading>Reviews</Heading>
            <ul className="flex flex-col gap-3">
                <li className="bg-white border rounded shadow w-80 hover:shadow-xl">
                    <Link href="/reviews/hollow-night">
                        <img src="/images/hollow-knight.jpg" alt=""
                            width="320px" height="180px" className="rounded-t"
                        />
                        <h2 className="font-orbitron font-semibold py-1 text-center">
                            Hollow Knight
                        </h2>
                    </Link>
                </li>
                <li className="bg-white border rounded shadow w-80 hover:shadow-xl">
                    <Link href="/reviews/stardew-valley">
                        <img src="/images/stardew-valley.jpg" alt="Stardew Valley"
                            width="320px" height="180px" className="rounded-t"
                        />
                        <h2 className="font-orbitron font-semibold py-1 text-center">
                            Stardew Valley
                        </h2>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
