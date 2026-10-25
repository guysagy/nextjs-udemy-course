'use server';
import { revalidatePath } from 'next/cache';
import { createComment } from '@/lib/comments';

export async function createCommentAction(formData) {
    if (!formData.get('user')) {
        return { isError: true, message: 'Name field is required' };
    }

    const data = {
        slug: formData.get('slug'),
        user: formData.get('user'),
        message: formData.get('message'),
    };

    const message = await createComment(data);
    console.log('created comment : ', message);
    revalidatePath(`/reviews/${data.slug}`);
    // Q. in my course, when submitting a comment the pags is refreshed and remains scrolled to the comment,
    // but in my implementation the page refreshes and goes back to the top. why is that ?
    // A. revalidatePath clears the cached page. The server action's response then sends the fresh page back, and React updates it in place.
    // Nothing is navigated, so the page stays scrolled where it was and the new comment just appears.
    // redirect makes the client do a full router navigation, even to the URL you're already on.
    // Next.js scrolls to the top on every navigation, so you end up at the top of the page.
    // Your uncommitted change shows that revalidatePath was just added next to the redirect that was already there.
    // The course version probably keeps only revalidatePath. You don't need the redirect anymore,
    // because revalidating already re-renders the current page with the new comment.

    // To fix it, delete the redirect(...) line and the import { redirect } ... at the top.
    // If your Next.js version is on React 19, the form also clears its fields automatically after the action finishes.
    // redirect(`/reviews/${slug}`);
}