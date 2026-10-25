// import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createComment } from '@/lib/comments';

export default function CommentForm({ slug, title }) {
    async function action(formData) {
        'use server';

        if (!formData.get('user')) {
            return { isError: true, message: 'Name field is required' };
        }
        
        const message = await createComment({
            slug,
            user: formData.get('user'),
            message: formData.get('message'),
        });

        console.log('created comment : ', message);

        revalidatePath(`/reviews/${slug}`);
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
    return (
        <form action={action}
            className="border bg-white flex flex-col gap-2 mt-3 px-3 py-2 rounded">
            <p className="pb-1">
                Already played <strong>{title}</strong> ? Have your say !
            </p>
            <div className="flex">
                <label htmlFor="userField" className="shrink-0 w-32">
                    Your name
                </label>
                <input id="userField" name="user" required maxLength={50}
                    className="border px-2 py-1 rounded x-48"
                />
            </div>
            <div className="flex">
                <label htmlFor="messageField" className="shrink-0 w-32">
                    Your comment
                </label>
                <textarea id="messageField"  name="message" required maxLength={500}
                    className="border px-2 py-1 rounded w-full"
                />
            </div>
            <button type="submit"
                className="bg-orange-800 rounded px-2 py-1 self-center
                            text-slate-50 w-32 hover:bg-orange-700"
            >
                Submit
            </button>
        </form>
    );
}