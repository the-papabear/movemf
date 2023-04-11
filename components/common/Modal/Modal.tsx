import { PropsWithChildren } from 'react';

import Image from 'next/image';
import {
  Root,
  Close,
  Title,
  Portal,
  Overlay,
  Content,
  Trigger,
} from '@radix-ui/react-dialog';

import closeIcon from 'public/closeIcon.svg';
import Button from '@components/common/Button/Button';

import styles from '@components/common/Modal/Modal.module.css';

type ModalProps = {
  title?: string;
  trigger: string;
};

const Modal = ({ title, trigger, children }: PropsWithChildren<ModalProps>) => (
  <Root>
    <Trigger className={styles.modal__trigger}>
      <span>Add Exercise</span>
    </Trigger>
    <Portal>
      <Overlay className={styles.modal__overlay}>
        <Content className={styles.modal__content}>
          <div className={styles.modal__header__wrapper}>
            <Title>{title}</Title>
            <Close className={styles.modal__close}>
              <Image width={12} height={12} src={closeIcon} alt="close icon" />
            </Close>
          </div>
          {children}
        </Content>
      </Overlay>
    </Portal>
  </Root>
);

export default Modal;
