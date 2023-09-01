'use client';

import { PropsWithChildren } from 'react';
import { Root, Trigger, Portal, Overlay, Content, Close } from '@radix-ui/react-dialog';

interface DialogProps {
  trigger: JSX.Element;
}

export const Dialog = ({ children, trigger }: PropsWithChildren<DialogProps>) => {
  return (
    <Root>
      <Trigger asChild>{trigger}</Trigger>
      <Portal>
        <Overlay className="bg-gray-500 bg-opacity-30 fixed inset-0" />
        <Content className="data-[state=open]:animate-contentShow fixed top-[35%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[4px] bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          {children}
          <Close asChild>
            <button className="text-gray-700 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center focus:shadow-[0_0_0_2px]">
              x
            </button>
          </Close>
        </Content>
      </Portal>
    </Root>
  );
};
