import { ExerciseDTO } from '@/app/exercises/interfaces';

export interface WorkoutDTO {
  name: string;
  sets: SetDTO[];
  completedAt: Date;
}

export interface SetDTO {
  id: number;
  reps?: number;
  weight?: number;
  exercise: string;
  setNumber: number;
  restPeriod?: number;
}
