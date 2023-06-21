import styles from '@components/layout/Exercises/ExercisesForm/ExercisesForm.module.css';

type ExercisesFormProps = {
  values: any;
  handleSubmit: any;
  handleNameInputChange: any;
  handleLinkInputChange: any;
};

const ExercisesForm = ({ values, handleSubmit, handleNameInputChange, handleLinkInputChange }: ExercisesFormProps) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="name" className={styles.form__item}>
        Name
        <input type="text" value={values.name} className={styles.form__input} onChange={handleNameInputChange} />
      </label>
      <label htmlFor="link" className={styles.form__item}>
        Link
        <input type="text" value={values.link} className={styles.form__input} onChange={handleLinkInputChange} />
      </label>
    </form>
  );
};

export default ExercisesForm;
