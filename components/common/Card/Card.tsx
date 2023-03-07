import { PropsWithChildren } from 'react';

import styles from '@components/common/Card/Card.module.css';

const Card = ({ children }: PropsWithChildren) => (
  <div className={styles.card__container}>{children}</div>
);

export default Card;
