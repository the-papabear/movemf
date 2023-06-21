import { useEffect, useState } from 'react';

import axios from 'axios';

import ExerciseModal from '@components/layout/Exercises/ExerciseModal/ExerciseModal';

import styles from '@components/layout/Exercises/Exercises.module.css';

export const Exercises = () => {
  const [exercises, setExercises] = useState<any | []>();

  const getExercises = async () => {
    const { data } = await axios.get('/api/exercises');
    setExercises(data);
  };

  useEffect(() => {
    getExercises();
  }, []);
  return (
    <>
      <div className={styles.header}>
        <h2>Exercises</h2>
        <ExerciseModal title="Add exercise" exercises={exercises} setExercises={setExercises} />
      </div>
      {exercises &&
        exercises.map((exercise: any, index: number) => (
          <div className={styles.item} key={index}>
            {exercise.name}
          </div>
        ))}
    </>
  );
};
