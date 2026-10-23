import { getComments } from '@/lib/comments';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default async function CommentList({ slug }) {
    const comments = await getComments(slug);
    if (!comments.length) {
        return <p className="border rounded italic px-2 py-3 mt-3">No comments yet</p>
    }
    return (
        <ul className="border mt-3 rounded">
            {
                comments.map(comment => (
                    <li key={comment.id}
                        className="border-b py-3 py-2 px-3 odd:bg-orange-100 first:rounded-t last:rounded-b last:border-none">
                        <div className="flex gap-3 pb-1 text-slate-500">
                            <UserCircleIcon className="h-6 w-6" />
                            {comment.user}
                        </div>
                        <p className="italic">
                            {comment.message}
                        </p>
                    </li>
                ))
            }
        </ul>
    )
}