'use client';

import { PropsWithChildren } from 'react';

import { Item } from '@radix-ui/react-dropdown-menu';

export const DropdownMenuItem = ({ children, onSelect }: PropsWithChildren<any>) => {
  return (
    <Item
      onSelect={onSelect}
      className="group relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-gray-500 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-400 data-[disabled]:text-gray-200 data-[highlighted]:text-white"
    >
      {children}
    </Item>
  );
};
