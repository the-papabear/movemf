import { ExerciseData } from '@/app/(protected)/exercises/interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useExerciseMutations = () => {
  const queryClient = useQueryClient();

  const createExercise = useMutation({
    mutationFn: async (exercise: ExerciseData) => {
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

  const updateExercise = useMutation({
    mutationFn: async (exercise: ExerciseData) => {
      try {
        await fetch(`/api/exercises/${exercise._id}`, {
          method: 'PATCH',
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
        await fetch(`/api/exercises/${exerciseId}`, { method: 'DELETE' });
      } catch (e: any) {
        return e;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });

  return { createExercise, updateExercise, deleteExercise };
};
