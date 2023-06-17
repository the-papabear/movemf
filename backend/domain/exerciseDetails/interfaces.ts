import { WorkoutDTO } from 'backend/domain/workout/interfaces';
import { ExerciseDTO } from 'backend/domain/exercise/interfaces';
import { EditExerciseDetailsData } from 'backend/domain/exerciseDetails/usecase/editExerciseDetails';
import { CreateExerciseDetailsData } from 'backend/domain/exerciseDetails/usecase/createExerciseDetails';
import { WithId } from 'mongodb';

export interface ExerciseDetailsDTO {
  _id: string;
  reps?: number;
  time?: number;
  notes?: string;
  weight?: number;
  insertedAt: Date;
  workout: WorkoutDTO;
  exercise: ExerciseDTO;
}

export interface ICreateExerciseDetailsUseCase {
  (exerciseDetails: CreateExerciseDetailsData): Promise<ExerciseDetailsDTO>;
}

//TODO: FIX THIS TYPE BECAUSE MONGO KEEPS MESSING WITH THE DTOs...
export interface IRetrieveExerciseDetailsById {
  (exerciseDetailsId: string): Promise<ExerciseDetailsDTO> | null | any;
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
