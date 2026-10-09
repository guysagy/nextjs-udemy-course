import qs from 'qs';
import { marked } from 'marked';

const CMS_URL = 'http://localhost:1337';

async function fetchReviews(parameters) {
    const url = `${CMS_URL}/api/reviews?` + qs.stringify(parameters, { encodeValuesOnly: true });
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`CMS returned ${response.status} for ${url}`);
    }
    return await response.json();
}

function toReview(item) {
    return {
        slug: item.slug,
        title: item.title,
        date: item.publishedAt,
        subtitle: item.subtitle,
        image: CMS_URL + (item.image?.url || null),
    };
}

export async function getSlugs() {
    const { data } = await fetchReviews({
        fields: ['slug'],
        sort: ['publishedAt:desc'],
        pagination: { pageSize: 100 },
    });
    return data.map(item => item.slug);
}

export async function getReviews(pageSize, page) {
    const { data } = await fetchReviews({
        fields: ['slug', 'title', 'subtitle', 'publishedAt'],
        populate: { image: { fields: ['url'] } },
        sort: ['publishedAt:desc'],
        pagination: { pageSize, page },
    });
    return data.map(toReview);
}

export async function getReview(slug) {
    const { data } = await fetchReviews({
        filters: { slug: { $eq: slug } },
        fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
        populate: { image: { fields: ['url'] } },
        pagination: { pageSize: 1, withCount: true },
    });
    if (data.length === 0) {
        return null;
    }
    const item = data?.[0];
    return {
        ...toReview(item),
        body: marked(item.body, { mangle: false, headerIds: false }),
    };
}

