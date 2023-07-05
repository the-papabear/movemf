import { PropsWithChildren } from 'react';

import { X } from 'react-feather';
import { Root, Close, Title, Portal, Overlay, Content, Trigger } from '@radix-ui/react-dialog';

import styles from 'components/common/Modal/Modal.module.css';

interface ModalProps {
  open?: boolean;
  title?: string;
  trigger: JSX.Element;
  toggleModal?: () => void;
}

export const Modal = ({ children, title, trigger, open, toggleModal }: PropsWithChildren<ModalProps>) => (
  <Root open={open} onOpenChange={toggleModal}>
    <Trigger className={styles.modal__trigger}>{trigger}</Trigger>
    <Portal>
      <Overlay className={styles.modal__overlay}>
        <Content className={styles.modal__content}>
          <div className={styles.modal__header__wrapper}>
            <Title>{title}</Title>
            <Close className={styles.modal__close}>
              <X height={20} />
            </Close>
          </div>
          {children}
        </Content>
      </Overlay>
    </Portal>
  </Root>
);
