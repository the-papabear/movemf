export interface ExerciseDTO {
  _id: string;
  name: string;
  link?: string;
  type: 'EXERCISE' | 'REST';
}
