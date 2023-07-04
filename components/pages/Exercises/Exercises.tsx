import { useEffect, useState } from 'react';
import axios from 'axios';

import { Modal } from '@components/common';
import { ExerciseDTO } from '@components/pages/Exercises/interfaces';
import { CreateOrEditExercise } from '@components/pages/Exercises/CreateExercise/CreateExercise';
import { ExercisesOverview } from '@components/pages/Exercises/ExercisesOverview/ExercisesOverview';

import styles from '@components/pages/Exercises/Exercises.module.css';

export const Exercises = () => {
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [exerciseData, setExerciseData] = useState({ name: '', link: '' });

  const [toggleModal, setToggleModal] = useState(false);

  const onModalToggle = () => {
    setToggleModal(!toggleModal);
  };

  const handleDelete = (exerciseId: string) => async () => {
    await axios.delete(`/api/exercises/${exerciseId}`);
    setExercises(exercises.filter((exercise: ExerciseDTO) => exercise._id !== exerciseId));
  };

  useEffect(() => {
    const getExercises = async () => {
      const { data } = await axios.get('/api/exercises');
      setExercises(data);
    };

    getExercises();
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setExerciseData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setExerciseData({ name: '', link: '' });

    const exercise: ExerciseDTO = await axios
      .post('/api/exercises', exerciseData)
      .then((response) => response.data.data);
    setExercises([...exercises, exercise]);

    setToggleModal(!toggleModal);
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Exercises</h2>
        <Modal open={toggleModal} title="Add Exercise" toggleModal={onModalToggle} trigger={<span>Add Exercise</span>}>
          <CreateOrEditExercise
            exerciseData={exerciseData}
            submitExercise={handleSubmit}
            setExerciseData={handleChange}
          />
        </Modal>
      </div>
      <ExercisesOverview exercises={exercises} handleDelete={handleDelete} />
    </>
  );
};
