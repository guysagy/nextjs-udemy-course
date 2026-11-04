import { Suspense } from 'react';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import  Heading from '@/components/Heading';
import CommentListSkeleton from '@/components/CommentListSkeleton';
import CommentList from '@/components/CommentList';
import CommentForm from '@/components/CommentForm';
import { getReview } from '@/lib/reviews';
import { getUserFromSession } from '@/lib/auth';
import ShareLinkButton from '@/components/ShareLinkButton';

export const dynamic = 'force-dynamic'; // this page is dynamic because we don't know the slugs at build time

// import { getSlugs } from '@/lib/reviews';
// export async function generateStaticParams() {
//     const slugs = await getSlugs();
//     return slugs.map(slug => ({ slug }));
// }

export async function generateMetadata({ params}) {
    const { slug } = await params;
    const review = await getReview(slug);
    if (!review) {
        notFound();
    }
    return {
        title: review.title,
        description: review.subtitle
    }
}

export default async function ReviewPage({ params }) {
    const { slug } = await params;
    const review = await getReview(slug);
    if (!review) {
        notFound();
    }

    const user = await getUserFromSession();

    const { title, subtitle, date, image, body } = review;
    return (
        <>
            <Heading>{title}</Heading>
            <p className="font-semibold pb-3">
                {subtitle}
            </p>
            <div className="flex gap-3 items-baseline">
                <p className="italic pb-2">{date}</p>
                <ShareLinkButton />
            </div>
            <Image src={image} alt=""
                width="640" height="360" className="mb-2 rounded"
            />
            <article dangerouslySetInnerHTML={{ __html: body }}
                className="max-w-screen-sm prose prose-slate"
            />
            <section className="border-dashed border-t max-w-screen-sm mt-3 py-3">
                <h2 className="font-bold flex gap-2 items-center text-xl">
                    <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
                    { user ? 'Comments' : <a href="/sign-in" className="text-orange-800 underline">Sign in to comment</a> }
                </h2>
                <CommentForm slug={slug} title={review.title} user={user} />
                <Suspense fallback={<CommentListSkeleton />}>
                    <CommentList slug={slug} />
                </Suspense>
            </section>
        </>
    )
}
