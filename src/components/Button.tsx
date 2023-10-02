'use client';

interface ButtonProps {
  title?: string;
  disabled?: boolean;
  className?: string;
  leadingIcon?: JSX.Element;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  title,
  onClick,
  leadingIcon,
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-block w-fit cursor-pointer rounded border-transparent bg-lime-600 px-2 py-1 text-base text-white hover:bg-lime-500 hover:shadow-lg hover:transition-all disabled:pointer-events-none disabled:bg-gray-300 ${className}`}
    >
      {leadingIcon} {title}
    </button>
  );
}
