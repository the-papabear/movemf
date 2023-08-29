import { MoreHorizontal } from 'react-feather';

import { Dialog, Button, DropdownMenu } from '@/components';
import { ExerciseDTO, ExerciseData } from '@/components/pages/Exercises/interfaces';
import { EditExercise } from '@/components/pages/Exercises/EditExercise/EditExercise';

interface ExercisesOverviewProps {
  isModalOpen: boolean;
  exercises: ExerciseDTO[];
  exerciseData: ExerciseData;
  submitExercise: (e: any) => void;
  setExerciseData: (e: any) => void;
  handleDelete: (exerciseId: string) => () => void;
  setIsModalOpen: (exerciseId: string, name: string, link: string) => () => void;
}

export const ExercisesOverview = ({
  exercises,
  isModalOpen,
  handleDelete,
  exerciseData,
  setIsModalOpen,
  submitExercise,
  setExerciseData,
}: ExercisesOverviewProps) => {
  return (
    <div className="p-4">
      {exercises &&
        exercises.map((exercise, index) => (
          <div key={index} className="flex align-center gap-4 p-2 rounded hover:bg-gray-300">
            <DropdownMenu trigger={<MoreHorizontal />}>
              <>
                {exercise.link && (
                  <Button>
                    <a target="_blank" href={`http://${exercise.link}`}>
                      Go to link
                    </a>
                  </Button>
                )}
                {/* <Modal
                  open={isModalOpen}
                  title={exercise.name}
                  trigger={<span>Edit</span>}
                  toggleModal={setIsModalOpen(exercise._id, exercise.name, exercise.link!)}
                >
                  <EditExercise
                    exerciseData={exerciseData}
                    submitExercise={submitExercise}
                    setExerciseData={setExerciseData}
                  />
                </Modal> */}
                <Dialog trigger={<Button className="bg-gray-700 text-white">Delete</Button>}>
                  <div className="flex flex-col gap-4">
                    <span className="text-left">
                      By deleting this exercise you will delete{' '}
                      <span className="text-red-500">all workouts that use it!</span> Continue?
                    </span>
                    <button className="bg-gray-700 text-white rounded" onClick={handleDelete(exercise._id)}>
                      Delete
                    </button>
                  </div>
                </Dialog>
              </>
            </DropdownMenu>
            {exercise.name}
          </div>
        ))}
    </div>
  );
};
