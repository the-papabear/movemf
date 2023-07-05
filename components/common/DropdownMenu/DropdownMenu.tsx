import { PropsWithChildren } from 'react';
import { Root, Trigger, Portal, Content, Arrow } from '@radix-ui/react-dropdown-menu';

import styles from '@components/common/DropdownMenu/DropdownMenu.module.css';

interface DropdownMenuProps {
  trigger: JSX.Element;
}

export const DropdownMenu = ({ trigger, children }: PropsWithChildren<DropdownMenuProps>) => {
  return (
    <Root>
      <Trigger className={styles.dropdown__trigger}>{trigger}</Trigger>
      <Portal>
        <Content className={styles.dropdown__content}>
          {children}
          <Arrow className={styles.dropdown__arrow} />
        </Content>
      </Portal>
    </Root>
  );
};
