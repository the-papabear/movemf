import { useQuery } from '@tanstack/react-query';

import { ExerciseDTO } from '@/app/(protected)/exercises/interfaces';

export const useExerciseQueries = () => {
  const { isPending, data } = useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/exercises');
        const { data }: Record<string, ExerciseDTO[]> = await response.json();

        return data;
      } catch (e: any) {
        return e;
      }
    },
  });

  return { isPending, data };
};
