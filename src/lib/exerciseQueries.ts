import { ExerciseDTO } from '@/app/(protected)/exercises/interfaces';

export const getExercises = async () => {
  try {
    const response = await fetch('/api/exercises');
    const { data }: Record<string, ExerciseDTO[]> = await response.json();

    return data;
  } catch (e: any) {
    return e;
  }
};
