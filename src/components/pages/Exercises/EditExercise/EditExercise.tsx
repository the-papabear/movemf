import { Button } from '@/components';

import { ExerciseData } from '@/components/pages/Exercises/interfaces';

import s from '@/pages/Exercises/EditExercise/EditExercise.module.css';

interface EditExerciseProps {
  exerciseData: ExerciseData;
  submitExercise: (e: any) => void;
  setExerciseData: (e: any) => void;
}

export const EditExercise = ({ exerciseData, submitExercise, setExerciseData }: EditExerciseProps) => {
  return (
    <>
      <form className={s['form']} onSubmit={submitExercise}>
        <label htmlFor="name">
          <h4>Name</h4>
        </label>
        <input
          required
          type="text"
          name="name"
          value={exerciseData.name}
          onChange={setExerciseData}
          className={s['exerciseForm__input']}
        />
        <label htmlFor="link">
          <h4>Link</h4>
        </label>
        <input
          type="text"
          name="link"
          value={exerciseData.link}
          onChange={setExerciseData}
          className={s['exerciseForm__input']}
        />
        <Button type="submit" onClick={() => submitExercise}>
          Submit
        </Button>
      </form>
    </>
  );
};
