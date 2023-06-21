import { useEffect, useState } from 'react';

import axios from 'axios';

import { Modal } from '@components/common';
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
        <Modal triggerTitle="Add Exercise" title="Add Exercise"></Modal>
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
