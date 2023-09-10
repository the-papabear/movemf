'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'react-feather';

import { Button } from '@/components';

interface SetsData {
  reps: number;
  weight: number;
  setNumber: number;
  exerciseId: string;
  restPeriod: number;
}

export default function Workout() {
  const router = useRouter();
  const completedAt = new Date().toISOString().split('T')[0].replace('.', '-');

  const [exercise, setExercise] = useState<SetsData>({
    reps: 0,
    weight: 0,
    setNumber: 1,
    restPeriod: 0,
    exerciseId: '',
  });

  const [workout, setWorkout] = useState<any>({
    name: '',
    sets: [],
    completedAt,
  });

  const [exercises, setExercises] = useState<any>([]);
  useEffect(() => {
    getExercises();

    async function getExercises() {
      const exercises = (await axios.get('/api/exercises')).data.data;
      setExercises(exercises);
    }
  }, []);

  const onSubmit = async () => {
    axios.post('/api/workouts', workout);

    setWorkout({ name: '', sets: [], completedAt });
    router.push('/');
  };

  const handleWorkoutChange = (event: any) => {
    const { name, value } = event.target;
    setWorkout((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  const handleExerciseChange = (event: any) => {
    const { name, value } = event.target;
    setExercise((prevFormData: any) => ({ ...prevFormData, [name]: name === 'exerciseId' ? value : +value }));
  };

  const onSaveExerciseClick = () => {
    setWorkout({
      ...workout,
      sets: [...workout.sets, exercise],
    });

    setExercise({
      reps: 0,
      weight: 0,
      setNumber: 1,
      restPeriod: 0,
      exerciseId: '',
    });
  };

  return (
    <>
      <div className="mt-4 flex items-center justify-between">
        <button className="flex hover:text-lime-700" onClick={() => router.push('/')}>
          <ChevronLeft />
          <span>Workouts</span>
        </button>
        <Button onClick={onSubmit} className="h-[30px] w-[80px] bg-yellow-500">
          +
        </Button>
      </div>

      <section className="mt-6 flex flex-col gap-2 px-2">
        <h2 className="my-4 text-xl font-bold">General information</h2>
        <label htmlFor="name">
          <h4>Name</h4>
        </label>
        <input
          type="text"
          name="name"
          value={workout.name}
          onChange={handleWorkoutChange}
          placeholder="Bicep crusher"
          className="h-[40px] w-full max-w-[300px] rounded border border-lime-700 px-4"
        />
        <label htmlFor="completedAt">
          <h4>Workout completion date</h4>
        </label>
        <input
          type="date"
          name="completedAt"
          value={workout.date}
          onChange={handleWorkoutChange}
          className="h-[40px] w-full max-w-[300px] rounded border border-lime-700 px-4"
        />
      </section>

      <section className="mt-6 flex flex-col gap-2 px-2">
        <h2 className="my-4px-2 text-xl font-bold">Workout overview</h2>
        {workout.sets.map((set: any, index: number) => (
          <div key={index} className="flex flex-col">
            <span>{set.weight}</span>
          </div>
        ))}
      </section>

      <section className="mt-6 flex flex-col gap-2 px-2">
        <h2 className="my-4px-2 text-xl font-bold">Exercises information</h2>
        <select
          required
          value={exercise.exerciseId}
          id="exerciseId"
          name="exerciseId"
          onChange={handleExerciseChange}
          defaultValue="select-placeholder"
          className="h-[40px] w-full max-w-[300px] rounded border border-lime-700 px-4"
        >
          <option value="select-placeholder" hidden>
            Select an exercise
          </option>
          {exercises.map((exercise: any) => (
            <option value={exercise._id} key={exercise._id}>
              {exercise.name}
            </option>
          ))}
        </select>
        <input
          value={exercise.reps}
          name="reps"
          type="number"
          onChange={handleExerciseChange}
          placeholder="Number of reps"
          className="h-[40px] w-full max-w-[300px] rounded border border-lime-700 px-4"
        />
        <input
          value={exercise.weight}
          type="number"
          name="weight"
          placeholder="Weights"
          onChange={handleExerciseChange}
          className="h-[40px] w-full max-w-[300px] rounded border border-lime-700 px-4"
        />
        <input
          value={exercise.restPeriod}
          name="restPeriod"
          type="number"
          onChange={handleExerciseChange}
          placeholder="Rest period"
          className="h-[40px] w-full max-w-[300px] rounded border border-lime-700 px-4"
        />

        <Button onClick={onSaveExerciseClick} className="my-4 self-center">
          Save Exercise
        </Button>
      </section>
    </>
  );
}
