import { PropsWithChildren } from 'react';

import styles from '@/common/Button/Button.module.css';

interface ButtonProps {
  title?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  onClick,
  title,
  children,
  className,
  type = 'button',
  disabled = false,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={[styles['btn'], className].join(' ')}
      onClick={onClick}
      placeholder={title}
    >
      {children}
    </button>
  );
};
