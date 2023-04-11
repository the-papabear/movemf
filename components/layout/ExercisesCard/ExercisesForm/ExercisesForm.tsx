import { useState } from 'react';
import axios from 'axios';

import Button from '@components/common/Button/Button';

import styles from '@components/layout/ExercisesCard/ExercisesForm/ExercisesForm.module.css';

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
      .post('api/exercises', {
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
      <Button onClick={onExerciseSubmit} title="Add exercise" />
    </form>
  );
};

export default ExercisesForm;
