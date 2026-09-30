import  Heading from '@/components/Heading';
import { getReview, getReviewSlugs } from '@/lib/reviews';
import ShareLinkButton from '@/components/ShareLinkButton';

export async function generateStaticParams() {
    const slugs = await getReviewSlugs();
    return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params: { slug } }) {
    const { title, description } = await getReview(slug);
    return {
        title,
        description
    }
}

export default async function ReviewPage({ params: { slug } }) {
    const { title, date, image, body } = await getReview(slug);

    return (
        <>
            <Heading>{title}</Heading>
            <div className="flex gap-3 items-baseline">
                <p className="italic pb-2">{date}</p>
                <ShareLinkButton />
            </div>
            <img src={image} alt=""
                width="640px" height="360px" className="mb-2 rounded"
            />
            <article dangerouslySetInnerHTML={{ __html: body }}
                className="max-w-screen-sm prose prose-slate"
            />
        </>
    )
}
