import { PropsWithChildren } from 'react';

import styles from '@components/common/Button/Button.module.css';

interface ButtonProps {
  title?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({ onClick, title, type, children }: PropsWithChildren<ButtonProps>) => {
  return (
    <button type={type} className={styles.btn} onClick={onClick} placeholder={title}>
      {children}
    </button>
  );
};
