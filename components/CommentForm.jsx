'use client';

import React from 'react';
import { createCommentAction } from '@/app/reviews/[slug]/actions';
import useFormState from '@/lib/hooks/useFormState';

export default function CommentForm({ slug, title }) {
    const [state, handleSubmit] = useFormState(createCommentAction);

    return (
        <form onSubmit={handleSubmit}
            className="border bg-white flex flex-col gap-2 mt-3 px-3 py-2 rounded">
            <p className="pb-1">
                Already played <strong>{title}</strong> ? Have your say !
            </p>
            <input type="hidden" name="slug" value={slug} />
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
            {
                Boolean(state.error) && (
                    <p className="text-red-700">{state.error}</p>
                )
            }
            <button type="submit" disabled={state.disabled}
                className="bg-orange-800 rounded px-2 py-1 self-center
                            text-slate-50 w-32 hover:bg-orange-700
                            disabled:bg-slate-500 disabled:cursor-not-allowed"
            >
                Submit
            </button>
        </form>
    );
}
