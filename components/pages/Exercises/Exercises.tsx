import { useEffect, useState } from 'react';
import axios from 'axios';

import { Modal } from '@/common';
import { ExerciseDTO, ExerciseData } from '@/pages/Exercises/interfaces';
import { CreateExercise } from '@/pages/Exercises/CreateExercise/CreateExercise';
import { ExercisesOverview } from '@/pages/Exercises/ExercisesOverview/ExercisesOverview';

import styles from '@/pages/Exercises/Exercises.module.css';

export const Exercises = () => {
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);

  const [hasDataChanged, setHasDataChanged] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [exerciseData, setExerciseData] = useState<ExerciseData>({ id: '', name: '', link: '' });

  const onCreateModalToggle = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const onEditModalToggle = (exerciseId: string, exerciseName: string, exerciseLink: string) => () => {
    setIsEditModalOpen(!isEditModalOpen);

    setExerciseData({ id: exerciseId, name: exerciseName, link: exerciseLink });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setExerciseData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    const getExercises = async () => {
      const exercises = (await axios.get('/api/exercises')).data.data;
      setExercises(exercises);
    };

    getExercises();
  }, [hasDataChanged]);

  const handleCreate = async (e: any) => {
    e.preventDefault();

    const exercise: ExerciseDTO = await axios
      .post('/api/exercises', { name: exerciseData.name, link: exerciseData.link })
      .then((response) => response.data.data);
    setHasDataChanged(!hasDataChanged);

    setExerciseData({ id: '', name: '', link: '' });
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    await axios.patch(`/api/exercises/${exerciseData.id}`, exerciseData).then((response) => response.data.data);
    setHasDataChanged(!hasDataChanged);

    setExerciseData({ id: '', name: '', link: '' });
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleDelete = (exerciseId: string) => async () => {
    await axios.delete(`/api/exercises/${exerciseId}`);
    setHasDataChanged(!hasDataChanged);
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Exercises</h2>
        <Modal
          title="Add exercise"
          open={isCreateModalOpen}
          toggleModal={onCreateModalToggle}
          trigger={<span>Add exercise</span>}
        >
          <CreateExercise exerciseData={exerciseData} submitExercise={handleCreate} setExerciseData={handleChange} />
        </Modal>
      </div>
      <ExercisesOverview
        exercises={exercises}
        handleDelete={handleDelete}
        exerciseData={exerciseData}
        submitExercise={handleEdit}
        isModalOpen={isEditModalOpen}
        setExerciseData={handleChange}
        setIsModalOpen={onEditModalToggle}
      />
    </>
  );
};
