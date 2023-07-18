import { useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';
import { ArrowLeftCircle, Plus, X } from 'react-feather';

import { Button } from '@/common';
import { ExerciseDTO } from '@/pages/Exercises/interfaces';
import { ExerciseDetailsForm } from '@/pages/Workouts/ExerciseDetailsForm';

import s from '@/pages/Workouts/NewWorkout/NewWorkouts.module.css';
import { ExerciseDetailsDTO } from '@/pages/Workouts/interfaces';

interface NewWorkoutProps {
  exercises: ExerciseDTO[];
}

export const NewWorkout = ({ exercises }: NewWorkoutProps) => {
  const router = useRouter();

  const [exerciseDetailsInput, setExerciseDetailsInput] = useState<ExerciseDetailsDTO[]>([]);

  const [formData, setFormData] = useState({
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
    const res = await axios.post('/api/workouts/', new Date(formData.completedAt));
    setFormData({ ...formData, workoutId: res.data.data._id });
  };

  const onFormSubmit = () => {
    router.push('/');
  };

  const onAddExerciseClick = async () => {
    const exerciseDetails = await axios.patch(`/api/workouts/${formData.workoutId}`, formData);

    setExerciseDetailsInput(exerciseDetails.data.data.exerciseDetails);

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

  //TODO: The approach bellow makes the data between workouts and exerciseDetails to not be in sync in the database
  //find a sexier solution for managing deleting on the BE and updating the UI
  const onDeleteExerciseDetails = (exerciseDetailsId: string) => async () => {
    await axios.delete(`/api/exerciseDetails/${exerciseDetailsId}`);
    const updatedList = exerciseDetailsInput.filter((exerciseDetails) => exerciseDetails._id !== exerciseDetailsId);
    setExerciseDetailsInput(updatedList);
  };

  return (
    <>
      <header className={s['header']}>
        <ArrowLeftCircle
          cursor="pointer"
          onClick={() => {
            router.push('/');
          }}
        />
        <h2>New Workout</h2>
      </header>

      <section className={s['datePicker__container']}>
        <h4>Completed at</h4>
        <div className={s['datePicker__wrapper']}>
          <input
            name="completedAt"
            type="datetime-local"
            onChange={handleChange}
            className={s['datePicker']}
            value={formData.completedAt}
          />
          {!formData.workoutId && (
            <Button type="submit" onClick={createWorkout} className={s['dateAddBtn']}>
              <Plus size={14} />
            </Button>
          )}
        </div>
      </section>

      <section className={s['exerciseDetails-cards__wrapper']}>
        <h5>Workout overview</h5>
        {exerciseDetailsInput.map((exerciseDetails, index) => (
          <div key={index} className={s['exercise__wrapper']}>
            <div>
              <span>Set {exerciseDetails.setNumber} | </span>
              <span> {exerciseDetails.reps || 0} </span>
              <span>{exercises.find((exercise) => exercise._id === exerciseDetails.exercise._id)!.name}</span>
            </div>
            <X size={14} onClick={onDeleteExerciseDetails(exerciseDetails._id)} />
          </div>
        ))}
      </section>

      <ExerciseDetailsForm exercises={exercises} formData={formData} handleChange={handleChange} />

      {formData.exerciseId && <Button onClick={onAddExerciseClick}>Add</Button>}

      <footer className={s['submit-btn']}>
        <Button onClick={onFormSubmit}>Save workout</Button>
      </footer>
    </>
  );
};
