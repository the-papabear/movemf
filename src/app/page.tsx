'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';
import { MoreHorizontal } from 'react-feather';

import { Button } from '@/components';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    (async function getWorkouts() {
      const workouts = await axios.get('/api/workouts');
      setWorkouts(workouts.data.data);
    })();
  }, []);

  return (
    <>
      <Button className="my-8">Add Workout</Button>

      <table className="w-full">
        <thead>
          <tr className="border-b-[1px] border-lime-500 rounded">
            <th className="text-xs font-light text-left pb-1">Completed at</th>
            <th className="text-xs font-light text-left">Name</th>
            <th className="text-xs font-light text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout: any, index: number) => (
            <tr key={index}>
              <td>{workout.completedAt?.toISOString() || 'No date'}</td>
              <td>{workout.name}</td>
              <td>
                <MoreHorizontal />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
