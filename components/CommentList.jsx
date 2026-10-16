import { UserCircleIcon } from '@heroicons/react/24/outline';

const comments = [
    { id: '1', user: 'Alica', message: 'Love this game!'},
    { id: '2', user: 'Bob', message: 'ok, but not really my genere!'},
    { id: '3', user: 'Charlie', message: 'Can\'t stop playing it'},
];

export default function CommentList() {
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