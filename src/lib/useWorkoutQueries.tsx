import { useQuery } from '@tanstack/react-query';

export const useWorkoutQueries = () => {
  const { isPending, data } = useQuery({
    queryKey: ['workouts'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/workouts');
        const { data }: Record<string, any[]> = await response.json();

        return data;
      } catch (e: any) {
        return e;
      }
    },
  });

  return { isPending, data };
};
