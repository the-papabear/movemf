import styles from '@components/common/Button/Button.module.css';

interface ButtonProps {
  title?: string;
  onClick?: () => void;
  theme?: 'btn__primary' | 'default';
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ onClick, title, theme = 'default', type }: ButtonProps) => {
  return (
    <button type={type} className={[styles.btn, styles[theme]].join(' ')} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
