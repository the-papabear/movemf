import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ArrowDownRight, ArrowLeftCircle } from 'react-feather';
import * as Collapsible from '@radix-ui/react-collapsible';

import { Button } from '@components/common/';

import styles from '@components/pages/Workouts/NewWorkout/NewWorkouts.module.css';

interface NewWorkoutProps {
  exercises: any[];
}

export const NewWorkout = ({ exercises }: NewWorkoutProps) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    workoutId: '',
    exerciseId: '',
    completedAt: new Date(Date.now()).toISOString().split('.')[0],
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
    setFormData({ ...formData, workoutId: res.data.data._id });
  };

  const onFormSubmit = async () => {
    await axios.patch(`/api/workouts/${formData.workoutId}`, formData);
  };

  return (
    <>
      <header className={styles.header}>
        <ArrowLeftCircle
          cursor="pointer"
          onClick={() => {
            router.push('/');
          }}
        />
        <h2>New Workout</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="completedAt">
          <h4 className={styles.completedAt}>Completed at</h4>
        </label>
        <div className={styles.datePicker__wrapper}>
          <input type="datetime-local" name="completedAt" value={formData.completedAt} onChange={handleChange} />
          <Button type="submit" onClick={createWorkout}>
            Next
          </Button>
        </div>
      </form>
      {formData.workoutId && (
        <form onSubmit={handleSubmit}>
          <Collapsible.Root>
            <Collapsible.Trigger>
              <>
                <ArrowDownRight />
                <select name="exerciseId" id="exerciseId" onChange={handleChange}>
                  <option value="" disabled selected hidden>
                    Select an exercise
                  </option>
                  {exercises.map((exercise) => (
                    <option value={exercise._id} key={exercise._id}>
                      {exercise.name}
                    </option>
                  ))}
                </select>
              </>
            </Collapsible.Trigger>
            <Collapsible.Content>
              {formData.exerciseId && (
                <>
                  <input
                    type="number"
                    name="reps"
                    placeholder="Number of reps"
                    value={formData.reps}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="weight"
                    placeholder="Weights"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="time"
                    placeholder="How long did it take?"
                    value={formData.time}
                    onChange={handleChange}
                  />
                  <input type="text" name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />
                </>
              )}
              <Button>Add another Exercise</Button>
              <Button>Add Rest period</Button>
            </Collapsible.Content>
          </Collapsible.Root>
          <Button>Add workout</Button>
        </form>
      )}
    </>
  );
};
