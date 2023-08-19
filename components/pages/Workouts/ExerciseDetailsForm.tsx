import { ExerciseDTO } from '@/pages/Exercises/interfaces';

import s from 'components/pages/Workouts/ExerciseDetailsForm.module.css';

interface SetFormProps {
  formData: any;
  exercises: ExerciseDTO[];
  handleChange: (e: any) => void;
}

export const SetForm = ({ exercises, formData, handleChange }: SetFormProps) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      {formData.workoutId && (
        <form onSubmit={handleSubmit}>
          <h5>Add new exercise</h5>
          <select
            id="exerciseId"
            name="exerciseId"
            onChange={handleChange}
            className={s['select-exercise']}
            defaultValue="select-placeholder"
          >
            <option value="select-placeholder" disabled hidden>
              Select an exercise
            </option>
            {exercises.map((exercise) => (
              <option value={exercise._id} key={exercise._id}>
                {exercise.name}
              </option>
            ))}
          </select>

          {formData.exerciseId && (
            <div className={s['input__wrapper']}>
              <input
                required
                type="number"
                name="setNumber"
                className={s['input']}
                onChange={handleChange}
                placeholder="Set Number"
                value={formData.setNumber}
              />
              <input
                name="reps"
                type="number"
                className={s['input']}
                value={formData.reps}
                onChange={handleChange}
                placeholder="Number of reps"
              />
              <input
                type="number"
                name="weight"
                className={s['input']}
                placeholder="Weights"
                value={formData.weight}
                onChange={handleChange}
              />
              <input
                type="number"
                name="time"
                className={s['input']}
                placeholder="Time"
                value={formData.time}
                onChange={handleChange}
              />
              <textarea
                rows={4}
                cols={20}
                id="notes"
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={handleChange}
                className={s['input__full']}
              ></textarea>
            </div>
          )}
        </form>
      )}
    </>
  );
};
