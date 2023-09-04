export interface ExerciseDTO {
  _id: string;
  name: string;
  link?: string;
  type: 'EXERCISE' | 'REST';
}

export interface ExerciseData {
  id?: string;
  name: string;
  link?: string;
}

export interface CreateOrEditExerciseProps {
  exerciseData?: ExerciseData;
  handleChange: (e: any) => void;
  submitExercise: (e: any) => void;
}
