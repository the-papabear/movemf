import { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';
import { ArrowLeftCircle } from 'react-feather';

import Button from '@components/common/Button/Button';

import styles from '@components/pages/workouts/NewWorkout/NewWorkouts.module.css';

interface NewWorkoutProps {
  exercises: any[];
}

export const NewWorkout = ({ exercises }: NewWorkoutProps) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    workoutId: '',
    exerciseId: '',
    completedAt: '',
    reps: undefined,
    time: undefined,
    notes: undefined,
    weight: undefined,
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const createWorkout = async () => {
    const res = await axios.post('/api/workouts/', new Date(formData.completedAt));
    setFormData({ ...formData, workoutId: res.data.workout._id });
  };

  const onFormSubmit = async () => {
    await axios.patch(`/api/workouts/${formData.workoutId}`, formData);
  };

  return (
    <>
      <header className={styles.header}>
        <ArrowLeftCircle cursor="pointer" onClick={() => router.push('/')} />
        <h2>New Workout</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="completedAt">
          <input type="date" name="completedAt" value={formData.completedAt} onChange={handleChange} />
        </label>
        <Button type="submit" title="Next" onClick={createWorkout}></Button>
      </form>
      {formData.workoutId && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="exerciseId">
            <h3>Exercise</h3>
          </label>
          <select name="exerciseId" id="exerciseId" onChange={handleChange}>
            {exercises.map((exercise) => (
              <option value={exercise._id} key={exercise._id}>
                {exercise.name}
              </option>
            ))}
          </select>
          {formData.exerciseId && (
            <>
              <label htmlFor="weight">
                <h3>Weight</h3>
              </label>
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
              <label htmlFor="time">
                <h3>Time</h3>
              </label>
              <input type="number" name="time" value={formData.time} onChange={handleChange} />
              <label htmlFor="reps">
                <h3>Reps</h3>
              </label>
              <input type="number" name="reps" value={formData.reps} onChange={handleChange} />
              <label htmlFor="notes">
                <h3>Notes</h3>
              </label>
              <input type="text" name="notes" value={formData.notes} onChange={handleChange} />
              <Button type="submit" title="Add Workout" onClick={onFormSubmit}></Button>
            </>
          )}
        </form>
      )}
    </>
  );
};
