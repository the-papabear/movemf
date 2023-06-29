export interface ExerciseDB {
  _id: string;
  name: string;
  link: string | null;
  type: 'EXERCISE' | 'REST';
}
