import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import { Button } from '@/common/';
import { WorkoutDTO } from '@/pages/Workouts/interfaces';
import { WorkoutsOverview } from '@/pages/Workouts/WorkoutsOverview/WorkoutsOverview';

import styles from '@/pages/Workouts/Workouts.module.css';

export const Workouts = () => {
  const router = useRouter();

  const [workouts, setWorkouts] = useState<WorkoutDTO[]>([]);

  useEffect(() => {
    const getWorkouts = async () => {
      const { data } = await axios.get('/api/workouts');
      setWorkouts(data);
    };

    getWorkouts();
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <h2>Workouts</h2>
        <Button onClick={() => router.push('/new-workout')}>Add workout</Button>
      </div>
      <WorkoutsOverview workouts={workouts} />
    </div>
  );
};
