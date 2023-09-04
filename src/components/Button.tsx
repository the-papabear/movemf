import { PropsWithChildren } from 'react';

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
      className={[
        'inline-block w-fit cursor-pointer rounded border-transparent bg-lime-700 px-2 py-1 text-xs text-white hover:bg-lime-600 hover:shadow-lg hover:transition-all sm:text-base',
        className,
      ].join(' ')}
      onClick={onClick}
      placeholder={title}
    >
      {children}
    </button>
  );
};
