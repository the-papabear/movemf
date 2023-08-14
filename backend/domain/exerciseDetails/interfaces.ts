import { ExerciseDTO } from '@backend/domain/exercise/interfaces';
import { EditExerciseDetailsData } from '@backend/domain/exerciseDetails/usecase/editExerciseDetails';
import { CreateExerciseDetailsData } from '@backend/domain/exerciseDetails/usecase/createExerciseDetails';

export interface ExerciseDetailsDTO {
  _id: string;
  reps?: number;
  time?: number;
  notes?: string;
  weight?: number;
  insertedAt: Date;
  workoutId: string;
  setNumber: number;
  exercise: ExerciseDTO;
}

export interface ICreateExerciseDetailsUseCase {
  (exerciseDetails: CreateExerciseDetailsData): Promise<ExerciseDetailsDTO>;
}

export interface IRetrieveExerciseDetailsById {
  (exerciseDetailsId: string): Promise<ExerciseDetailsDTO | null>;
}

export interface IRetrieveExerciseDetailsByIds {
  (exerciseDetailsIds: string[]): Promise<ExerciseDetailsDTO[]>;
}

export interface IPersistExerciseDetails {
  (exerciseDetails: ExerciseDetailsDTO): Promise<void>;
}

export interface IEditExerciseDetailsUseCase {
  (exerciseDetails: EditExerciseDetailsData): Promise<ExerciseDetailsDTO>;
}

export interface IUpdateExerciseDetails {
  (exerciseDetails: ExerciseDetailsDTO): Promise<void>;
}

export interface IRemoveExerciseDetails {
  (exerciseDetailsId: string): Promise<void>;
}

export interface IRetrieveExerciseDetailsByExerciseId {
  (exerciseId: string): Promise<ExerciseDetailsDTO[]>;
}
