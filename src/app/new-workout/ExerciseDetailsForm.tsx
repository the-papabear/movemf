import { ExerciseDTO } from '@/app/exercises/interfaces';

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
            className="bg-gray-400 border-transparent rounded h-[30px] w-full mb-10"
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
            <div className="flex flex-col gap-2 px-4">
              <input
                required
                type="number"
                name="setNumber"
                className="h-[30px]"
                onChange={handleChange}
                placeholder="Set Number"
                value={formData.setNumber}
              />
              <input
                name="reps"
                type="number"
                className="h-[30px]"
                value={formData.reps}
                onChange={handleChange}
                placeholder="Number of reps"
              />
              <input
                type="number"
                name="weight"
                className="h-[30px]"
                placeholder="Weights"
                value={formData.weight}
                onChange={handleChange}
              />
              <input
                type="number"
                name="time"
                className="h-[30px]"
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
              ></textarea>
            </div>
          )}
        </form>
      )}
    </>
  );
};
