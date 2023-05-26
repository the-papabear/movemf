export interface ExerciseDTO {
  _id: string;
  name: string;
  link?: string | null;
  workoutDetails: WorkoutDetails[] | null;
}

export interface WorkoutDetails {
  _id: string;
  reps: number;
  notes: string;
  weight: number;
  workoutId: string;
}

export interface IPersistExercise {
  (exercise: ExerciseDTO): Promise<void>;
}
