'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import { Button } from '@/components';
import { WorkoutDTO } from '@/components/pages/Workouts/interfaces';
import { WorkoutsOverview } from '@/components/pages/Workouts/WorkoutsOverview';

export const Workouts = () => {
  const router = useRouter();

  const [workouts, setWorkouts] = useState<WorkoutDTO[]>([]);

  useEffect(() => {
    const getWorkouts = async () => {
      const workouts = (await axios.get('/api/workouts')).data.data;
      setWorkouts(workouts);
    };

    getWorkouts();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h2>Workouts</h2>
        <Button onClick={() => router.push('/new-workout')}>Add workout</Button>
      </div>
      <WorkoutsOverview workouts={workouts} />
    </div>
  );
};
