import { ExerciseDTO } from 'backend/domain/exercise/interfaces';

export interface WorkoutDTO {
  _id: string;
  completedAt: Date;
  exercises: ExerciseDTO[];
}

export interface WorkoutDetailsDTO {
  _id: string;
  reps?: number;
  time?: number;
  notes?: string;
  weight?: number;
  workout: WorkoutDTO;
}

//TODO: Map the result to fix the any in this interface
export interface IRetrieveWorkoutById {
  (workoutId: string): Promise<WorkoutDTO | null | any>;
}

export interface IPersistWorkout {
  (workout: WorkoutDTO): Promise<void>;
}

export interface IPersistWorkoutDetails {
  (workoutDetails: WorkoutDetailsDTO): Promise<void>;
}
