import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useExerciseMutations = () => {
  const queryClient = useQueryClient();

  const createExercise = useMutation({
    mutationFn: async (exercise: { name: string; link?: string }) => {
      try {
        await fetch(`/api/exercises`, {
          method: 'POST',
          body: JSON.stringify(exercise),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (e: any) {
        return e;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });

  const deleteExercise = useMutation({
    mutationFn: async (exerciseId: string) => {
      try {
        const response = await fetch(`/api/exercises/${exerciseId}`, { method: 'DELETE' });
        const { data } = await response.json();

        return data;
      } catch (e: any) {
        return e;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });

  return { createExercise, deleteExercise };
};
