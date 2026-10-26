'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useIsClient from '@/lib/hooks/useIsClient';
import { useDebounce } from 'use-debounce';
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from '@headlessui/react';

export default function SearchBox() {
  const router = useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (debouncedQuery.length >= 1) {
      const controller = new AbortController();
      (async () => {
        const url = '/api/search/?query=' + encodeURIComponent(debouncedQuery)
        const response = await fetch(url, { signal: controller.signal });
        const reviews = await response.json();
        setReviews(reviews);
      })();
      return () => controller.abort(); // cleanup function to abort fetch on unmount or query change
    } else {
      setReviews([]);
    }
  }, [debouncedQuery]);

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
        { reviews.length > 0 && (
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
        )}
      </Combobox>
    </div>
  );
}
