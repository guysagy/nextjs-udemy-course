import Image from 'next/image';
import PaginationBar from '@/components/PaginationBar';
import  Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Reviews'
};

export default async function ReviewsPage({searchParams}) {
    searchParams = await searchParams;
    const page = parsePageParam(searchParams?.page);
    const { reviews , pageCount } = await getReviews(2, page);

    return (
        <div>
            <Heading>Reviews</Heading>
            <PaginationBar href="/reviews" page={page} pageCount={pageCount} />
            <ul className="flex flex-row flex-wrap gap-3">
                {reviews.map((review, index) => (
                    <li key={review.slug}
                        className="bg-white border rounded shadow w-80 hover:shadow-xl">
                        <Link href={`/reviews/${review.slug}`}>
                            <Image src={review.image} alt="" priority={index === 0}
                                width="320" height="180" className="rounded-t"
                            />
                            <div className="px-2 py-1 text-center sm:text-left">
                                <h2 className="font-orbitron font-semibold">
                                    {review.title}
                                </h2>
                                <p className="hidden pt-2 sm:block">
                                    {review.subtitle}
                                </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function parsePageParam(param) {
    const page = parseInt(param, 10);
    return Number.isFinite(page) && page >= 1 ? page : 1;
}