import styles from '@components/common/Button/Button.module.css';

interface ButtonProps {
  title?: string;
  onClick?: () => void;
  theme?: 'btn__primary' | 'default';
}

const Button = ({ onClick, title, theme = 'default' }: ButtonProps) => {
  return (
    <button className={[styles.btn, styles[theme]].join(' ')} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
