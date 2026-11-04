import { db } from './db';

export async function createComment({slug, userId, message}) {
    return await db.comment.create({
        data: { slug, userId, message }
    });
}

export async function getComments(slug) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return await db.comment.findMany({
        where: { slug },
        orderBy: { postedAt: 'desc' },
    });
}
