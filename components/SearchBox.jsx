'use client'

import { Combobox, ComboboxInput } from '@headlessui/react';
export default function SearchBox() {
  return (
    <Combobox>
      <ComboboxInput placeholder="Search..." />
    </Combobox>
  );
}
