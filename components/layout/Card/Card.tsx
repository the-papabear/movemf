import styles from "@components/layout/Card/Card.module.css";

type CardProps = {
  data: any;
  buttonLabel: string;
  onClick: () => void;
};

const Card = ({ data, buttonLabel, onClick }: CardProps) => (
  <div className={styles.card__container}>
    <button className={styles.card__btn} onClick={onClick}>
      {buttonLabel}
    </button>
    <div className={styles.card__data}>
      {data.map((data: any, index: number) => (
        <span key={index}>{data.name}</span>
      ))}
    </div>
  </div>
);

export default Card;
