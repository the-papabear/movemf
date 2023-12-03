import { ExerciseDTO } from '@/backend/domain/exercise/interfaces';

export interface WorkoutDTO {
  _id: string;
  name: string;
  sets: SetDTO[];
  userId: string;
  completedAt: Date;
}

export interface SetDTO {
  reps: number;
  weight: number;
  setNumber: number;
  exercise: ExerciseDTO;
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

export interface IUpdateWorkout {
  (workoutDTO: WorkoutDTO): Promise<void>;
}

export interface IRemoveWorkout {
  (workoutId: string): Promise<void>;
}
