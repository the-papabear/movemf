import { ExerciseDTO } from '@components/pages/Exercises/interfaces';

export interface WorkoutDTO {
  _id: string;
  completedAt: Date;
  exerciseDetails: ExerciseDetailsDTO;
}

interface ExerciseDetailsDTO {
  _id: string;
  reps?: number;
  time?: number;
  notes?: string;
  weight?: number;
  insertedAt: Date;
  workoutId: string;
  exercise: ExerciseDTO;
}
