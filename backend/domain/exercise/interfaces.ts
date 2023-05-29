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

//TODO: Fix this type
export interface IRetrieveExerciseById {
  (exerciseId: string): Promise<ExerciseDTO | null | any>;
}

export interface IRetrieveExercisesByIds {
  (exerciseIds: string[]): Promise<ExerciseDTO[]>;
}

export interface IRetrieveExerciseByName {
  (exerciseName: string): Promise<ExerciseDTO | null | any>;
}

export interface IPersistExercise {
  (exercise: ExerciseDTO): Promise<void>;
}

export interface IUpdateExercise {
  (exercise: ExerciseDTO): Promise<void>;
}
