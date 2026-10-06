import Image from 'next/image';
import  Heading from '@/components/Heading';
import { getReview, getSlugs } from '@/lib/reviews';
import ShareLinkButton from '@/components/ShareLinkButton';

export async function generateStaticParams() {
    const slugs = await getSlugs();
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
    const { title, subtitle, date, image, body } = await getReview(slug);

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
        </>
    )
}
