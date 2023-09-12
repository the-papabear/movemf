import { ExerciseDTO } from '@/app/exercises/interfaces';

export interface WorkoutDTO {
  name: string;
  sets: SetDTO[];
  completedAt: Date;
}

export interface SetDTO {
  reps?: number;
  weight?: number;
  setNumber: number;
  restPeriod?: number;
  exercise: ExerciseDTO;
}
