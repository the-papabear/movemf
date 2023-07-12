import { MoreHorizontal } from 'react-feather';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

import { Button } from '@/common';
import { ExerciseDTO } from '@/pages/Exercises/interfaces';
import { DropdownMenu } from '@/common/DropdownMenu/DropdownMenu';

import styles from '@/pages/Exercises/ExercisesOverview/ExercisesOverview.module.css';

interface ExercisesOverviewProps {
  exercises: ExerciseDTO[];
  handleDelete: (exerciseId: string) => () => void;
}

export const ExercisesOverview = ({ exercises, handleDelete }: ExercisesOverviewProps) => {
  return (
    <div className={styles.exercises__wrapper}>
      {exercises &&
        exercises.map((exercise, index) => (
          <div className={styles.items} key={index}>
            <DropdownMenu trigger={<MoreHorizontal />}>
              <>
                {exercise.link && (
                  <Dropdown.Item className={styles.dropdownMenu__item}>
                    <Button>
                      <a target="_blank" href={`http://${exercise.link}`} className={styles.link}>
                        Go to link
                      </a>
                    </Button>
                  </Dropdown.Item>
                )}
                <Dropdown.Item className={styles.dropdown__item}>
                  <Button onClick={handleDelete(exercise._id)}>Delete</Button>
                </Dropdown.Item>
              </>
            </DropdownMenu>
            {exercise.name}
          </div>
        ))}
    </div>
  );
};
