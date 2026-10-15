'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useIsClient from '@/lib/hooks/isClient';
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from '@headlessui/react';

export default function SearchBox({ reviews }) {
  const router = useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = useState('');

  const handleChange = (review) => {
    router.push(`/reviews/${review.slug}`);
  }

  if (!isClient) {
    return null;
  }

  const filteredReviews = reviews.filter(
    (review) => review.title.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 10);

  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <ComboboxInput placeholder="Search..."
          value={query} onChange={(event) => setQuery(event.target.value)}
          className="bg-white border px-2 py-1 rounded w-full"
        />
        <ComboboxOptions className="absolute bg-white border rounded shadow w-full">
          {
            filteredReviews.map((review) => (
              <ComboboxOption key={review.slug} value={review}>
                {
                  ({focus}) => (
                    <span className={`block px-2 truncate w-full ${focus ? 'bg-orange-100 cursor-pointer' : ''}`}>
                      {review.title}
                    </span>
                  )
                }
              </ComboboxOption>
            ))
          }
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
