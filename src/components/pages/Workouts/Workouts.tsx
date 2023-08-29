import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';

import logo from 'public/logo.svg';
import { Button } from '@/common/';
import { WorkoutDTO } from '@/pages/Workouts/interfaces';
import { WorkoutsOverview } from '@/pages/Workouts/WorkoutsOverview';

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
