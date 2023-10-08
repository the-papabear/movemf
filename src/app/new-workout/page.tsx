'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChevronLeft, X } from 'react-feather';

import Button from '@/components/Button';
import { SetDTO, WorkoutDTO } from '@/app/interfaces';
import SetInfoForm from '@/app/new-workout/SetInfoForm';
import { ExerciseDTO } from '@/app/exercises/interfaces';

const NewWorkout = () => {
  const router = useRouter();

  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  useEffect(() => {
    getExercises();

    async function getExercises() {
      await axios
        .get('/api/exercises')
        .then((res) => {
          setExercises(res.data.data);
        })
        .catch((err) => {});
    }
  }, []);

  const [exerciseInfo, setExerciseInfo] = useState<SetDTO>({
    id: 0,
    reps: 0,
    weight: 0,
    setNumber: 1,
    exercise: '',
    restPeriod: 0,
  });

  const [workout, setWorkout] = useState<WorkoutDTO>({
    name: '',
    sets: [],
    completedAt: new Date(),
  });

  const handleWorkoutChange = (event: any) => {
    const { name, value } = event.target;
    setWorkout((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  const onSubmit = async () => {
    await axios.post('/api/workouts', workout);
    setWorkout({ name: '', sets: [], completedAt: new Date() });
    router.push('/workouts');
  };

  return (
    <div className="flex w-full flex-col">
      {/* Page Header */}
      <section className="mt-4 flex w-full items-center justify-between self-start">
        <button className="flex hover:text-lime-700" onClick={() => router.push('/')}>
          <ChevronLeft />
          <span>Workouts</span>
        </button>

        <Button onClick={onSubmit} title="Save Workout" disabled={!workout.name} />
      </section>

      {/* General info section */}
      <section className="flex w-full flex-col items-center gap-4">
        <h2 className="mt-6 text-xl font-bold">General information</h2>
        <label htmlFor="name">
          <p className="text-sm text-green-900">Name*</p>
          <input
            id="name"
            name="name"
            type="text"
            value={workout.name}
            autoComplete="autoComplete"
            onChange={handleWorkoutChange}
            placeholder="e.g. Bicep crushers"
            className="h-[40px] w-[300px] rounded border border-lime-700 px-4 placeholder:text-sm"
          />
        </label>

        <label htmlFor="completedAt">
          <p className="text-sm text-green-900">Completed at</p>
          <input
            type="date"
            id="completedAt"
            name="completedAt"
            onChange={handleWorkoutChange}
            value={parseDate(workout.completedAt) || parseDate(new Date())}
            className="h-[40px] w-[300px] rounded border border-lime-700 px-4 placeholder:text-sm"
          />
        </label>
      </section>

      <SetInfoForm
        workout={workout}
        exercises={exercises}
        setWorkout={setWorkout}
        exerciseInfo={exerciseInfo}
        setExerciseInfo={setExerciseInfo}
      />

      {/* Workout overview section */}
      <section className="my-4 flex w-full flex-col items-center gap-4">
        <h2 className="my-4px-2 text-xl font-bold">Workout overview</h2>
        {workout.sets.map((set, index) => (
          <div key={index} className="flex w-full flex-col gap-1">
            <div className=" flex flex-col justify-between rounded-md  border border-lime-500 p-2">
              <div className="flex w-full items-center justify-between">
                <h3 className="text-lg">Set {set.setNumber}</h3>
                <X
                  width={16}
                  height={16}
                  className="cursor-pointer stroke-red-600"
                  onClick={() => {
                    const filteredSets = workout.sets.filter((filteredSet) => filteredSet.id !== set.id);
                    setWorkout({ ...workout, sets: [...filteredSets] });
                  }}
                />
              </div>
              <div className="flex gap-2">
                <p className="font-bold capitalize">
                  {exercises.find((exercise) => exercise._id === set.exercise)?.name}
                </p>
                <p>{set.reps} reps</p>
                <p>{set.weight} kg</p>
              </div>
              <p>{set.restPeriod} seconds rest</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default NewWorkout;

function parseDate(date: Date) {
  const theDate = new Date(date);
  return theDate.toISOString().split('T')[0].replace('.', '-');
}
