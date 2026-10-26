import { getComments } from '@/lib/comments';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function CommentListSkeleton() {
    return (
        <ul className="animate-pulse border mt-3 rounded">
            {
                [1,2,3].map(comment => (
                    <li key={comment.id}
                        className="border-b py-3 py-2 px-3 odd:bg-orange-100 first:rounded-t last:rounded-b last:border-none">
                        <div className="flex gap-3 items-center pb-1 text-slate-500">
                            <UserCircleIcon className="h-6 w-6" />
                            <div className="bg-slate-300 rounded h-3 w-24 " />
                        </div>
                        <p className="py-1">
                            <div className="bg-slate-300 rounded h-3 w-2/3 " />
                        </p>
                    </li>
                ))
            }
        </ul>
    )
}