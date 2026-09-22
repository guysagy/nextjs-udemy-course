import  Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';
import Link from 'next/link';

export const metadata = {
    title: 'Reviews'
};

export default async function ReviewsPage() {
    const reviews = await getReviews();

    return (
        <div>
            <Heading>Reviews</Heading>
            <ul className="flex flex-row flex-wrap gap-3">
                {reviews.map((review) => (
                    <li key={review.slug}
                        className="bg-white border rounded shadow w-80 hover:shadow-xl">
                        <Link href={`/reviews/${review.slug}`}>
                            <img src={review.image} alt=""
                                width="320px" height="180px" className="rounded-t"
                            />
                            <h2 className="font-orbitron font-semibold py-1 text-center">
                                {review.title}
                            </h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
