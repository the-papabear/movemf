'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { MoreHorizontal } from 'react-feather';

import { Button } from '@/components';
import { ExerciseDTO } from '@/components/pages/Exercises/interfaces';

const Exercises = () => {
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);

  useEffect(() => {
    const getExercises = async () => {
      const exercises = (await axios.get('/api/exercises')).data.data;
      setExercises(exercises);
    };

    getExercises();
  }, []);

  return (
    <>
      <Button className="my-8">Add Exercise</Button>

      <table className="w-full">
        <tr className="border-b-[1px] border-lime-500 rounded">
          <th className="text-xs font-light text-left">Name</th>
          <th className="text-xs font-light text-right">Actions</th>
        </tr>
        {exercises.map((exercise, index) => (
          <tr key={index}>
            <td>{exercise.name}</td>
            <td>{exercise.link}</td>
            <td>
              <MoreHorizontal />
            </td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Exercises;
