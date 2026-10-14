'use client'

import useIsClient from '@/lib/hooks/isClient';
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from '@headlessui/react';

const reviews = [
  { slug: 'stardew-valley', title: 'Stardew Valley' },
  { slug: 'hellblade', title: 'Hellblade' },
  { slug: 'hollow-knight', title: 'Hollow Knight' }
];

export default function SearchBox() {
  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  return (
    <div className="relative w-48">
      <Combobox>
        <ComboboxInput placeholder="Search..." className="bg-white border px-2 py-1 rounded w-full" />
        <ComboboxOptions className="absolute bg-white border rounded shadow w-full">
          {
            reviews.map((review) => (
              <ComboboxOption key={review.slug}>
                {
                  ({active}) => (
                    <span className={`block px-2 truncate w-full ${active ? 'bg-orange-100' : ''}`}>
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

