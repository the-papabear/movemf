import { ExerciseDTO } from '@/app/exercises/interfaces';
import Button from '@/components/Button';

const SetInfoForm = ({ exerciseInfo, setExerciseInfo, setWorkout, workout, exercises }: any) => {
  const handleExerciseChange = (event: any) => {
    const { name, value } = event.target;
    setExerciseInfo((prevFormData: any) => ({ ...prevFormData, [name]: name === 'exercise' ? value : +value }));
  };

  const onSaveExerciseClick = () => {
    setWorkout({
      ...workout,
      sets: [...workout.sets, exerciseInfo],
    });

    setExerciseInfo({
      ...exerciseInfo,
      reps: 0,
      weight: 0,
      setNumber: 1,
      restPeriod: 0,
      id: exerciseInfo.id + 1,
    });
  };

  return (
    <section className="mt-6 flex w-full flex-col items-center gap-2 px-2">
      <h2 className="my-4px-2 text-xl font-bold">Exercises information</h2>
      <select
        id="exercise"
        name="exercise"
        value={exerciseInfo.exercise}
        onChange={handleExerciseChange}
        className="h-[40px] w-full max-w-[300px] rounded border border-lime-700 px-4"
      >
        <option value="select-placeholder" hidden>
          Select an exercise
        </option>
        {exercises.map((exercise: ExerciseDTO) => (
          <option key={exercise._id} value={exercise._id}>
            {exercise.name}
          </option>
        ))}
      </select>
      <label htmlFor="reps">
        <p className="text-sm text-green-900">Number of reps</p>
        <input
          min={0}
          id="reps"
          name="reps"
          type="number"
          onChange={handleExerciseChange}
          value={exerciseInfo.reps.toString()}
          className="h-[40px] w-[300px] rounded border border-lime-700 px-4 placeholder:text-sm"
        />
      </label>
      <label htmlFor="weight">
        <p className="text-sm text-green-900">Weight amount</p>
        <input
          min={0}
          id="weight"
          type="number"
          name="weight"
          onChange={handleExerciseChange}
          value={exerciseInfo.weight.toString()}
          className="h-[40px] w-[300px] rounded border border-lime-700 px-4 placeholder:text-sm"
        />
      </label>

      <label htmlFor="restPeriod">
        <p className="text-sm text-green-900">Rest time after exercise</p>
        <input
          min={0}
          type="number"
          id="restPeriod"
          name="restPeriod"
          onChange={handleExerciseChange}
          value={exerciseInfo.restPeriod.toString()}
          className="h-[40px] w-[300px] rounded border border-lime-700 px-4 placeholder:text-sm"
        />
      </label>

      <Button title="Save Exercise" onClick={onSaveExerciseClick} disabled={!exerciseInfo.exercise} />
    </section>
  );
};

export default SetInfoForm;
