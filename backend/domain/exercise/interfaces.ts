export type ExerciseType = 'EXERCISE' | 'TYPE';

export interface ExerciseDTO {
  _id: string;
  name: string;
  type: ExerciseType;
  link?: string | null;
}

//TODO: Fix this type by mapping out the db result to it
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
