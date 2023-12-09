export const deleteExercise = async (exerciseId: string) => {
  try {
    const response = await fetch(`/api/exercise/${exerciseId}`, { method: 'DELETE' });
    const { data } = await response.json();

    return data;
  } catch (e: any) {
    return e;
  }
};
