import  Heading from '@/components/Heading';
import { getReview } from '@/lib/reviews';

export default async function HollowNightPage() {
    const { title, date, image, body } = await getReview('hollow-night');

    return (
        <>
            <Heading>{title}</Heading>
            <p className="italic pb-2">{date}</p>
            <img src={image} alt=""
                width="640px" height="360px" className="mb-2 rounded"
            />
            <article dangerouslySetInnerHTML={{ __html: body }}
                className="max-w-screen-sm prose prose-slate"
            />
        </>
    )
}
