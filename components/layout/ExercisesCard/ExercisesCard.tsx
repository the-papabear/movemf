import { useState, useEffect } from 'react';

import axios from 'axios';

import Card from '@components/common/Card/Card';
import Modal from '@components/common/Modal/Modal';
import ExercisesForm from '@components/layout/ExercisesCard/ExercisesForm/ExercisesForm';

import styles from '@components/layout/ExercisesCard/ExercisesCard.module.css';

const ExercisesCard = () => {
  const [exercises, setExercises] = useState<any | []>();

  useEffect(() => {
    axios.get('/api/exercises').then((res) => setExercises(res.data));
  }, []);

  return (
    <Card>
      <div className={styles.exercisesCard__title}>
        <span>Exercises</span>
        <Modal title="Add exercise" trigger="Add Exercise">
          <ExercisesForm />
        </Modal>
      </div>
      <div className={styles.exercisesCard__item__wrapper}>
        {exercises &&
          exercises.map((exercise: any, index: number) => (
            <div className={styles.exercisesCard__item} key={index}>
              {exercise.name}
            </div>
          ))}
      </div>
    </Card>
  );
};

export default ExercisesCard;
