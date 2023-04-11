import { useRouter } from 'next/router';

import Card from '@components/common/Card/Card';
import Button from '@components/common/Button/Button';

import styles from '@components/layout/WorkoutsCard/WorkoutsCard.module.css';

const WorkoutsCard = () => {
  const router = useRouter();
  return (
    <Card>
      <div className={styles.workoutsCard__title}>
        <span>Workouts</span>
        <Button
          onClick={() => {
            router.push('/workouts');
          }}
          title="Start Workout"
        />
      </div>
    </Card>
  );
};

export default WorkoutsCard;
