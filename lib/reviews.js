import { readdir, readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';

export async function getFeaturedReview() {
    const reviews = await getReviews()
    return reviews?.[0];
}

export async function getReview(slug) {
    const text = await readFile(`./content/reviews/${slug}.md`, 'utf-8');
    const { content, data: { title, date, image } } = matter(text);
    const body = marked(content, { headerIds: false, mangle: false });
    return { slug, title, date, image, body };
}

export async function getReviews() {
    const slugs = await getReviewSlugs();
    const reviews = [];
    for (const slug of slugs) {
        const review = await getReview(slug);
        reviews.push(review);
    }
    reviews.sort((a,b) => new Date(b.date) - new Date(a.date));
    return reviews;
}

export async function getReviewSlugs() {
    const files = await readdir('./content/reviews');
    const slugs = files.filter(file => file.endsWith('.md')).map(file => file.replace(/\.md$/, ''));
    return slugs;
}
