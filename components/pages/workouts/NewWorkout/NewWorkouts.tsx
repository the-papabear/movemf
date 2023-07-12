import { useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';
import { ArrowLeftCircle, Plus, X } from 'react-feather';

import { Button } from '@/common';
import { ExerciseDTO } from '@/pages/Exercises/interfaces';
import { ExerciseDetailsForm } from '@/pages/Workouts/ExerciseDetailsForm';

import s from '@/pages/Workouts/NewWorkout/NewWorkouts.module.css';

interface NewWorkoutProps {
  exercises: ExerciseDTO[];
}

export const NewWorkout = ({ exercises }: NewWorkoutProps) => {
  const router = useRouter();

  const [exerciseDetailsInput, setExerciseDetailsInput] = useState<any[]>([]);

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
    await axios.patch(`/api/workouts/${formData.workoutId}`, formData);

    setExerciseDetailsInput((arr) => [...arr, formData]);

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
          <div key={index} className={s['exercise']}>
            <span className={s['exercise__setNumber']}>
              <strong>Set</strong> {exerciseDetails.setNumber}
            </span>
            <span className={s['exercise__name']}>
              {exercises.find((exercise) => exercise._id === exerciseDetails.exerciseId)?.name}
            </span>
            <span className={s['exercise__reps']}>
              {exerciseDetails.reps || 0} <strong>Reps</strong>
            </span>
            <span className={s['exercise__weights']}>
              {exerciseDetails.weights || 0} <strong>Kgs</strong>
            </span>
            <X size={14} className={s['exercise__remove']} />
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
