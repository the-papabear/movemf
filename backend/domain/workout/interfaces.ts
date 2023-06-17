import { ExerciseDetailsDTO } from 'backend/domain/exerciseDetails/interfaces';

export interface WorkoutDTO {
  _id: string;
  completedAt: Date;
  exerciseDetails: ExerciseDetailsDTO[];
}

//TODO: Map the result to fix the any in this interface
export interface IRetrieveWorkoutById {
  (workoutId: string): Promise<WorkoutDTO | null | any>;
}

export interface IPersistWorkout {
  (workout: WorkoutDTO): Promise<void>;
}

export interface IEditWorkout {
  (workoutDTO: WorkoutDTO): Promise<void>;
}
