'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { MoreHorizontal } from 'react-feather';

import { Button } from '@/components';
import { WorkoutDTO } from '@/components/pages/Workouts/interfaces';

const Workouts = () => {
  const [workouts, setWorkouts] = useState<WorkoutDTO[]>([]);

  useEffect(() => {
    const getWorkouts = async () => {
      const workouts = (await axios.get('/api/workouts')).data.data;
      setWorkouts(workouts);
    };

    getWorkouts();
  }, []);

  return (
    <>
      <Button className="my-8">Add Workout</Button>

      <table className="w-full">
        <tr className="border-b-[1px] border-lime-500 rounded">
          <th className="text-xs font-light text-left pb-1">Completed at</th>
          <th className="text-xs font-light text-left">Name</th>
          <th className="text-xs font-light text-right">Actions</th>
        </tr>
        {workouts.map((workout, index) => (
          <tr key={index}>
            <td>{workout.completedAt.toISOString()}</td>
            <td>{workout.name}</td>
            <td>
              <MoreHorizontal />
            </td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Workouts;
