export interface ExerciseDTO {
  _id: string;
  name: string;
  link?: string;
  type: 'EXERCISE' | 'REST';
}

export interface ExerciseData {
  name: string;
  link?: string;
  id: string;
}
