'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { MoreHorizontal } from 'react-feather';

import { Button } from '@/components';

export default function Workouts() {
  const router = useRouter();

  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    (async function getWorkouts() {
      const workouts = await axios.get('/api/workouts');
      setWorkouts(workouts.data.data);
    })();
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          router.push('/new-workout');
        }}
        className="my-8"
      >
        Add Workout
      </Button>

      <table className="w-full">
        <thead>
          <tr className="rounded border-b-[1px] border-lime-500">
            <th className="text-left text-xs font-light">Name</th>
            <th className="text-right text-xs font-light">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout: any, index: number) => (
            <tr key={index} className="h-[60px] cursor-pointer hover:bg-lime-100">
              <td>{workout.name}</td>
              <td>
                <div className="flex justify-end pr-3">
                  <MoreHorizontal width={20} height={20} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
