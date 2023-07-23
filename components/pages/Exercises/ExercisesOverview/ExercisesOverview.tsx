import { MoreHorizontal } from 'react-feather';

import { Button, Modal } from '@/common';
import { DropdownMenu } from '@/common/DropdownMenu/DropdownMenu';
import { ExerciseDTO, ExerciseData } from '@/pages/Exercises/interfaces';
import { EditExercise } from '@/pages/Exercises/EditExercise/EditExercise';

import styles from '@/pages/Exercises/ExercisesOverview/ExercisesOverview.module.css';

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
    <div className={styles.exercises__wrapper}>
      {exercises &&
        exercises.map((exercise, index) => (
          <div className={styles.items} key={index}>
            <DropdownMenu trigger={<MoreHorizontal />}>
              {exercise.link && (
                <Button>
                  <a target="_blank" href={`http://${exercise.link}`} className={styles.link}>
                    Go to link
                  </a>
                </Button>
              )}
              <Modal
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
              </Modal>
              <Button onClick={handleDelete(exercise._id)} className={styles['dropdown__item--dark']}>
                Delete
              </Button>
            </DropdownMenu>
            {exercise.name}
          </div>
        ))}
    </div>
  );
};
