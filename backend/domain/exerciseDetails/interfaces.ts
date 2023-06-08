import { WorkoutDTO } from 'backend/domain/workout/interfaces';
import { ExerciseDTO } from 'backend/domain/exercise/interfaces';

export interface ExerciseDetailsDTO {
  _id: string;
  reps?: number;
  time?: number;
  notes?: string;
  weight?: number;
  createdAt: Date;
  workout: WorkoutDTO;
  exercise: ExerciseDTO;
}

export interface IPersistExerciseDetails {
  (exerciseDetails: ExerciseDetailsDTO): Promise<void>;
}
