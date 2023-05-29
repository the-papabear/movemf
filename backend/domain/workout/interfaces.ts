import { ExerciseDTO } from 'backend/domain/exercise/interfaces';

export interface WorkoutDTO {
  _id: string;
  completedAt: Date;
  exercises: ExerciseDTO[];
}

export interface IPersistWorkout {
  (workout: WorkoutDTO): Promise<void>;
}
