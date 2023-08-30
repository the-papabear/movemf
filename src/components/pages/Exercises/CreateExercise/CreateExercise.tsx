import { Button } from '@/components';

import styles from '@/pages/Exercises/CreateExercise/CreateExercise.module.css';

interface CreateOrEditExerciseProps {
  submitExercise: (e: any) => void;
  setExerciseData: (e: any) => void;
  exerciseData: { name: string; link?: string };
}

export const CreateExercise = ({ exerciseData, submitExercise, setExerciseData }: CreateOrEditExerciseProps) => {
  return (
    <>
      <form className={styles.form} onSubmit={submitExercise}>
        <label htmlFor="name">
          <h4>Name</h4>
        </label>
        <input
          required
          type="text"
          name="name"
          value={exerciseData.name}
          onChange={setExerciseData}
          className={styles.exerciseForm__input}
        />
        <label htmlFor="link">
          <h4>Link</h4>
        </label>
        <input
          type="text"
          name="link"
          value={exerciseData.link}
          onChange={setExerciseData}
          className={styles.exerciseForm__input}
        />
        <Button type="submit" onClick={() => submitExercise}>
          Submit
        </Button>
      </form>
    </>
  );
};
