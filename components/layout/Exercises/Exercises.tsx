import { useEffect, useState } from 'react';

import axios from 'axios';
import { Trash2 } from 'react-feather';

import { Modal } from '@components/common';
import Button from '@components/common/Button/Button';

import styles from '@components/layout/Exercises/Exercises.module.css';

export const Exercises = () => {
  const [change, setChange] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [exercises, setExercises] = useState<any | []>();

  const [formData, setFormData] = useState({ name: '', link: '', type: 'EXERCISE' });

  const onModalToggle = () => {
    setToggleModal(!toggleModal);
    setChange(!change);
  };

  useEffect(() => {
    const getExercises = async () => {
      const { data } = await axios.get('/api/exercises');
      setExercises(data);
    };

    getExercises();
  }, [change]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormData({ name: '', link: '', type: 'EXERCISE' });
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Exercises</h2>
        <Modal triggerTitle="Add Exercise" title="Add Exercise" open={toggleModal} toggleModal={() => onModalToggle()}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            <label htmlFor="link">Link</label>
            <input type="text" name="link" value={formData.link} onChange={handleChange} />
            <span>Type</span>
            <select name="type" id="type" value={formData.type} onChange={handleChange}>
              <option value="EXERCISE">Exercise</option>
              <option value="REST">Rest</option>
            </select>
            <Button
              type="submit"
              title="Add Exercise"
              onClick={async () => {
                await axios.post('/api/exercises', formData);
                onModalToggle();
              }}
            />
          </form>
        </Modal>
      </div>
      <div className={styles.exercises__wrapper}>
        {exercises &&
          exercises.map((exercise: any, index: number) => (
            <div className={styles.item} key={index}>
              {exercise.name}
              <Trash2
                className={styles.removeItem}
                onClick={async () => {
                  await axios.delete(`/api/exercises/${exercise._id}`);
                  setChange(!change);
                }}
              />
            </div>
          ))}
      </div>
    </>
  );
};
