export interface WorkoutDTO {
  _id: string;
  completedAt: Date;
  exerciseDetails: ExerciseDetailsDTO;
}

export interface ExerciseDetailsDTO {
  reps?: number;
  time?: number;
  notes?: string;
  weight?: number;
  insertedAt: Date;
  workoutId: string;
  setNumber: number;
  exerciseId: string;
}
