import { Modal } from '@components/common';

import styles from '@components/layout/Workouts/Workouts.module.css';

export const Workouts = () => {
  return (
    <div>
      <div className={styles.header}>
        <h2>Workouts</h2>
        <Modal title="Add Workout" triggerTitle={'Add Workout'}></Modal>
      </div>
    </div>
  );
};
