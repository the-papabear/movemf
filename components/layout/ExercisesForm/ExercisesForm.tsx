import { useState } from 'react';

import styles from '@components/layout/ExercisesForm/ExercisesForm.module.css';
import axios from 'axios';

const ExercisesForm = () => {
  const [values, setValues] = useState({
    name: '',
    link: '',
  });

  const handleNameInputChange = (event: any) => {
    event.persist();
    setValues((values) => ({
      ...values,
      name: event.target.value,
    }));
  };

  const handleLinkInputChange = (event: any) => {
    event.persist();
    setValues((values) => ({
      ...values,
      link: event.target.value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const onExerciseSubmit = async () => {
    await axios
      .post('http://localhost:4000/api/exercises/exercise', {
        name: values.name,
        link: values.link,
      })
      .then((response) => console.log(response.data));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          value={values.name}
          onChange={handleNameInputChange}
        />
      </label>
      <label htmlFor="link">
        Link
        <input
          type="text"
          value={values.link}
          onChange={handleLinkInputChange}
        />
      </label>
      <button type="submit" onClick={onExerciseSubmit}>
        Add exercise
      </button>
    </form>
  );
};

export default ExercisesForm;
