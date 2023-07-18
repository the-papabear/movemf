import { ExerciseDTO } from '@/pages/Exercises/interfaces';

export interface WorkoutDTO {
  _id: string;
  completedAt: Date;
  exerciseDetails: ExerciseDetailsDTO;
}

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
