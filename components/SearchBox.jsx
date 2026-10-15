'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useIsClient from '@/lib/hooks/isClient';
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from '@headlessui/react';
import { searchReviews } from '@/lib/reviews';

export default function SearchBox() {
  const router = useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (query.length > 1) {
      (async () => {
        const reviews = await searchReviews(query);
        setReviews(reviews);
      })();
    } else {
      setReviews([]);
    }
  }, [query]);

  const handleChange = (review) => {
    if (!review) {
      return;
    }
    router.push(`/reviews/${review.slug}`);
  }

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <ComboboxInput placeholder="Search..."
          value={query} onChange={(event) => setQuery(event.target.value)}
          className="bg-white border px-2 py-1 rounded w-full"
        />
        <ComboboxOptions className="absolute bg-white border rounded shadow w-full">
          {
            reviews.map((review) => (
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
