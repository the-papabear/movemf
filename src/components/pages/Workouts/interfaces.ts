import { ExerciseDTO } from '@/components/pages/Exercises/interfaces';

export interface WorkoutDTO {
  _id: string;
  name: string;
  completedAt: Date;
  set: SetDTO;
}

export interface SetDTO {
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
