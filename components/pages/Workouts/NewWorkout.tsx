import { useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';
import { ArrowLeftCircle, Plus, X } from 'react-feather';

import { Button } from '@/common';
import { ExerciseDTO } from '@/pages/Exercises/interfaces';
import { SetDTO } from '@/pages/Workouts/interfaces';
import { SetForm } from '@/pages/Workouts/SetForm';

interface NewWorkoutProps {
  exercises: ExerciseDTO[];
}

export const NewWorkout = ({ exercises }: NewWorkoutProps) => {
  const router = useRouter();

  const [setInput, setSetInput] = useState<SetDTO[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    notes: '',
    workoutId: '',
    exerciseId: '',
    reps: undefined,
    time: undefined,
    weight: undefined,
    setNumber: undefined,
    completedAt: new Date(Date.now()).toISOString().split('.')[0],
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    let numberValue: any;

    if (name === 'reps' || name === 'time' || name === 'weight' || name === 'setNumber') {
      numberValue = Number(value);
    }
    setFormData((prevFormData) => ({ ...prevFormData, [name]: numberValue ? numberValue : value }));
  };

  const createWorkout = async () => {
    const res = await axios.post('/api/workouts/', {
      name: formData.name,
      completedAt: new Date(formData.completedAt),
    });
    setFormData({ ...formData, workoutId: res.data.data._id });
  };

  const onFormSubmit = () => {
    router.push('/');
  };

  const onAddExerciseClick = async () => {
    const set = await axios.patch(`/api/workouts/${formData.workoutId}`, formData);

    setSetInput(set.data.data.set);

    setFormData({
      ...formData,
      notes: '',
      exerciseId: '',
      reps: undefined,
      time: undefined,
      weight: undefined,
      setNumber: undefined,
      completedAt: new Date(Date.now()).toISOString().split('.')[0],
    });
  };

  //TODO: The approach bellow makes the data between workouts and set to not be in sync in the database
  //find a sexier solution for managing deleting on the BE and updating the UI
  const onDeleteSet = (setId: string) => async () => {
    await axios.delete(`/api/set/${setId}`);
    const updatedList = setInput.filter((set) => set._id !== setId);
    setSetInput(updatedList);
  };

  return (
    <>
      <header className="flex align-center gap-4">
        <ArrowLeftCircle
          cursor="pointer"
          onClick={() => {
            router.push('/');
          }}
        />
        <h2 className="text-xl font-bold">New Workout</h2>
      </header>

      <section className="flex flex-col md:flex-row justify-between">
        <div>
          <h4>Name</h4>
          <input type="text" name="name" onChange={handleChange} value={formData.name} />
        </div>
        <div>
          <h4>Completed at</h4>
          <div className="flex items-center">
            <input
              name="completedAt"
              type="datetime-local"
              onChange={handleChange}
              value={formData.completedAt}
              className="z-10 h-8 p-2 bg-gray-300 rounded-l border-transparent"
            />
            {!formData.workoutId && (
              <Button
                type="submit"
                onClick={createWorkout}
                className="z-10 h-8 p-2 bg-gray-300 rounded-r rounded-l-none border-transparent"
              >
                <Plus size={14} />
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h5>Workout overview</h5>
        {setInput.map((set, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-300 text-base p-2 rounded">
            <div>
              <span>Set {set.setNumber} | </span>
              <span> {set.reps || 0} </span>
              <span>{exercises.find((exercise) => exercise._id === set.exercise._id)!.name}</span>
            </div>
            <X size={14} onClick={onDeleteSet(set._id)} />
          </div>
        ))}
      </section>

      <SetForm exercises={exercises} formData={formData} handleChange={handleChange} />

      {formData.exerciseId && <Button onClick={onAddExerciseClick}>Add Exercise</Button>}

      <footer className="flex justify-center items-end">
        <Button onClick={onFormSubmit}>Save workout</Button>
      </footer>
    </>
  );
};
