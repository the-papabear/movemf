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
        'cursor-pointer inline-block px-3 h-8 bg-gray-400 border border-gray-400 rounded text-white hover:shadow-lg hover:transition-all',
        className,
      ].join(' ')}
      onClick={onClick}
      placeholder={title}
    >
      {children}
    </button>
  );
};
