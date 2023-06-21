import { useEffect, useState } from 'react';

import axios from 'axios';

import { Modal } from '@components/common';
import styles from '@components/layout/Exercises/Exercises.module.css';
import Button from '@components/common/Button/Button';

export const Exercises = () => {
  const [exercises, setExercises] = useState<any | []>();

  const getExercises = async () => {
    const { data } = await axios.get('/api/exercises');
    setExercises(data);
  };

  useEffect(() => {
    getExercises();
  }, []);

  const [formData, setFormData] = useState({ name: '', link: '', type: '' });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Exercises</h2>
        <Modal triggerTitle="Add Exercise" title="Add Exercise">
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            <label htmlFor="link">Link</label>
            <input type="text" name="link" value={formData.link} onChange={handleChange} />
            <span>Type</span>
            <select name="type" id="type" value={formData.type} onChange={handleChange}>
              <option value="exercise">Exercise</option>
              <option value="rest">Rest</option>
            </select>
            <Button type="submit" title="Add Exercise" onClick={() => axios.post('/api/exercises', formData)} />
          </form>
        </Modal>
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
