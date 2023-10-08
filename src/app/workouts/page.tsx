'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

import Button from '@/components/Button';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    (async function getWorkouts() {
      const { data } = await axios.get('/api/workouts');
      setWorkouts(data.data);
    })();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <Link href="/new-workout">
        <Button title="Add Workout" />
      </Link>

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Workouts;
