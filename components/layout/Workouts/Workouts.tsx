import { useRouter } from 'next/router';

import Button from '@components/common/Button/Button';

import styles from '@components/layout/Workouts/Workouts.module.css';

export const Workouts = () => {
  const router = useRouter();

  return (
    <div>
      <div className={styles.header}>
        <h2>Workouts</h2>
        <Button title="Add Workout" onClick={() => router.push('/new-workout')} />
      </div>
    </div>
  );
};
