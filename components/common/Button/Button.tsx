import styles from '@components/common/Button/Button.module.css';

interface ButtonProps {
  title?: string;
  onClick?: () => void;
}

const Button = ({ onClick, title }: ButtonProps) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
