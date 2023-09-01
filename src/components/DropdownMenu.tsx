'use client';

import { PropsWithChildren } from 'react';
import { Root, Trigger, Portal, Content, Arrow } from '@radix-ui/react-dropdown-menu';

interface DropdownMenuProps {
  trigger: JSX.Element;
}

export const DropdownMenu = ({ trigger, children }: PropsWithChildren<DropdownMenuProps>) => {
  return (
    <Root>
      <Trigger>{trigger}</Trigger>
      <Portal>
        <Content
          sideOffset={5}
          className="min-w-[150px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        >
          {children}
          <Arrow className="fill-white" />
        </Content>
      </Portal>
    </Root>
  );
};
