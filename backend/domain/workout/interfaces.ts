import { ExerciseDTO } from 'backend/domain/exercise/interfaces';

export interface WorkoutDTO {
  _id: string;
  completedAt: Date;
  exerciseDetails: ExerciseDTO[];
}

//TODO: Map the result to fix the any in this interface
export interface IRetrieveWorkoutById {
  (workoutId: string): Promise<WorkoutDTO | null | any>;
}

export interface IPersistWorkout {
  (workout: WorkoutDTO): Promise<void>;
}
