'use client';

interface ButtonProps {
  title?: string;
  leadingIcon?: any;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ leadingIcon, onClick, title, type = 'button', disabled = false }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-block w-fit cursor-pointer rounded border-transparent bg-lime-600 px-2 py-1 text-base text-white hover:bg-lime-500 hover:shadow-lg hover:transition-all"
    >
      {leadingIcon} {title}
    </button>
  );
}
