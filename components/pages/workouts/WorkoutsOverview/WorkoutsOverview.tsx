import { WorkoutDTO } from '@components/pages/Workouts/interfaces';

import styles from '@components/pages/Workouts/WorkoutsOverview/WorkoutsOverview.module.css';

interface WorkoutsOverviewProps {
  workouts: WorkoutDTO[];
}

export const WorkoutsOverview = ({ workouts }: WorkoutsOverviewProps) => {
  return (
    <div className={styles.workoutsOverview__wrapper}>
      <h4 style={{ margin: '1rem 0' }}>Completed at</h4>
      {workouts.map((workout, index) => (
        <span className={styles.workoutsOverview__item} key={index}>
          {new Date(workout.completedAt).toLocaleString()}
        </span>
      ))}
    </div>
  );
};
