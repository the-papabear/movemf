'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { MoreHorizontal } from 'react-feather';

import { Button, Dialog } from '@/components';
import { ExerciseData, ExerciseDTO } from '@/app/exercises/interfaces';

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

const DeleteExDialog = (exercise: any) => {
  const handleDelete = (exerciseId: string) => async () => {
    await axios.delete(`/api/exercises/${exerciseId}`);
  };

  return (
    <Dialog trigger={<Button className="bg-gray-700 text-white">Delete</Button>}>
      <div className="flex flex-col gap-4">
        <span className="text-left">
          By deleting this exercise you will delete <span className="text-red-500">all workouts that use it!</span>{' '}
          Continue?
        </span>
        <button className="bg-gray-700 text-white rounded" onClick={handleDelete(exercise._id)}>
          Delete
        </button>
      </div>
    </Dialog>
  );
};

interface EditExerciseProps {
  exerciseData: ExerciseData;
  submitExercise: (e: any) => void;
  setExerciseData: (e: any) => void;
}

const EditExercise = ({ exerciseData, submitExercise, setExerciseData }: EditExerciseProps) => {
  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={submitExercise}>
        <label htmlFor="name">
          <h4>Name</h4>
        </label>
        <input
          required
          type="text"
          name="name"
          value={exerciseData.name}
          onChange={setExerciseData}
          className="h-[30px]"
        />
        <label htmlFor="link">
          <h4>Link</h4>
        </label>
        <input type="text" name="link" value={exerciseData.link} onChange={setExerciseData} className="h-[30px]" />
        <Button type="submit" onClick={() => submitExercise}>
          Submit
        </Button>
      </form>
    </>
  );
};

interface CreateExerciseProps {
  exerciseData: ExerciseData;
  submitExercise: (e: any) => void;
  setExerciseData: (e: any) => void;
}

const CreateExercise = ({ exerciseData, submitExercise, setExerciseData }: CreateExerciseProps) => {
  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={submitExercise}>
        <label htmlFor="name">
          <h4>Name</h4>
        </label>
        <input
          required
          type="text"
          name="name"
          value={exerciseData.name}
          onChange={setExerciseData}
          className="h-[30px]"
        />
        <label htmlFor="link">
          <h4>Link</h4>
        </label>
        <input type="text" name="link" value={exerciseData.link} onChange={setExerciseData} className="h-[30px]" />
        <Button type="submit" onClick={() => submitExercise}>
          Submit
        </Button>
      </form>
    </>
  );
};
