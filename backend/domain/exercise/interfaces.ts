export type ExerciseType = 'EXERCISE' | 'REST';

export interface ExerciseDTO {
  _id: string;
  name: string;
  type: ExerciseType;
  link?: string | null;
}

export interface IRetrieveExerciseById {
  (exerciseId: string): Promise<ExerciseDTO | null>;
}

export interface IRetrieveExercisesByIds {
  (exerciseIds: string[]): Promise<ExerciseDTO[]>;
}

export interface IRetrieveExerciseByName {
  (exerciseName: string): Promise<ExerciseDTO | null>;
}

export interface IPersistExercise {
  (exercise: ExerciseDTO): Promise<void>;
}

export interface IUpdateExercise {
  (exercise: ExerciseDTO): Promise<void>;
}
