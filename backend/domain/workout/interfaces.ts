import { ExerciseDetailsDTO } from '@backend/domain/exerciseDetails/interfaces';
import { DeleteWorkoutData } from '@backend/domain/workout/usecase/deleteWorkout';

export interface WorkoutDTO {
  _id: string;
  name: string;
  userId: string;
  completedAt: Date;
  exerciseDetails: ExerciseDetailsDTO[];
}

export interface IRetrieveWorkouts {
  (userId: string): Promise<WorkoutDTO[]>;
}

export interface IRetrieveWorkoutById {
  (workoutId: string): Promise<WorkoutDTO | null>;
}

export interface IPersistWorkout {
  (workout: WorkoutDTO): Promise<void>;
}

export interface IEditWorkout {
  (workoutDTO: WorkoutDTO): Promise<void>;
}

export interface IRemoveWorkout {
  (workoutId: string): Promise<void>;
}

export interface IRemoveWorkoutUseCase {
  (deleteWorkoutData: DeleteWorkoutData): Promise<void>;
}
