'use client';

import { Item } from '@radix-ui/react-dropdown-menu';

interface DropdownMenuItemProps {
  name: string;
  onItemClick: () => void;
}

export const DropdownMenuItem = ({ name, onItemClick }: DropdownMenuItemProps) => {
  return (
    <Item
      onClick={onItemClick}
      className="cursor-pointer group text-[13px] leading-none text-gray-500 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-gray-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-400 data-[highlighted]:text-white"
    >
      {name}
    </Item>
  );
};
