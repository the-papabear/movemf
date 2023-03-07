import { useState } from 'react';

import styles from '@components/layout/ExercisesForm/ExercisesForm.module.css';

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

  return (
    <form className={styles.form}>
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
          type="url"
          value={values.link}
          onChange={handleLinkInputChange}
        />
      </label>
    </form>
  );
};

export default ExercisesForm;
