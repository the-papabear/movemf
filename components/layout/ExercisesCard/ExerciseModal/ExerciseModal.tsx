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

import styles from '@components/layout/ExercisesCard/ExerciseModal/ExerciseModal.module.css';

type ModalProps = {
  title?: string;
  trigger: string;
};

const Modal = ({ title, children }: PropsWithChildren<ModalProps>) => (
  <Root>
    <Trigger className={styles.modal__trigger}>Add Exercise</Trigger>
    <Portal>
      <Overlay className={styles.modal__overlay}>
        <Content className={styles.modal__content}>
          <div className={styles.modal__header__wrapper}>
            <Title>{title}</Title>
            <Close className={styles.modal__close}>
              <Image width={16} height={16} src={closeIcon} alt="close icon" />
            </Close>
          </div>
          {children}
        </Content>
      </Overlay>
    </Portal>
  </Root>
);

export default Modal;
