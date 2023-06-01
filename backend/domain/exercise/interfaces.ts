import { WorkoutDetailsDTO } from 'backend/domain/workout/interfaces';

export type ExerciseType = 'exercise' | 'rest';

export interface ExerciseDTO {
  _id: string;
  name: string;
  type: ExerciseType;
  link?: string | null;
  workoutDetails: WorkoutDetailsDTO[] | null;
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
