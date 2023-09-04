'use client';

import { PropsWithChildren } from 'react';
import { Root, Trigger, Portal, Overlay, Content, Close, Title } from '@radix-ui/react-dialog';

interface DialogProps {
  title?: string;
  trigger: JSX.Element;
  isModalOpen?: any;
  setIsModalOpen?: any;
}

export const Dialog = ({ children, trigger, title, isModalOpen, setIsModalOpen }: PropsWithChildren<DialogProps>) => {
  return (
    <Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Trigger asChild>{trigger}</Trigger>
      <Portal>
        <Overlay className="fixed inset-0 bg-gray-500 bg-opacity-30" />
        <Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[35%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[4px] bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          {title && <Title className="mb-4 text-start text-lg font-bold">{title}</Title>}
          <Close asChild>
            <button className="absolute right-[10px] top-[15px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center text-gray-700 focus:shadow-[0_0_0_2px]">
              x
            </button>
          </Close>
          {children}
        </Content>
      </Portal>
    </Root>
  );
};
