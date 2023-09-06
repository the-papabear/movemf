export interface ExerciseDTO {
  _id: string;
  name: string;
  link?: string;
  userId: string;
}

export interface IRetrieveExercises {
  (userId: string): Promise<ExerciseDTO[]>;
}

export interface IRetrieveExerciseById {
  (exerciseId: string): Promise<ExerciseDTO | null>;
}

export interface IRetrieveExercisesByIds {
  (exerciseIds: string[]): Promise<ExerciseDTO[]>;
}

export interface IRetrieveExerciseByName {
  (exerciseName: string, userId: string): Promise<ExerciseDTO | null>;
}

export interface IPersistExercise {
  (exercise: ExerciseDTO): Promise<void>;
}

export interface IUpdateExercise {
  (exercise: ExerciseDTO): Promise<void>;
}

export interface IRemoveExercise {
  (exerciseId: string): Promise<void>;
}
