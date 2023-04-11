import Card from '@components/common/Card/Card';
import Modal from '@components/common/Modal/Modal';
import ExercisesForm from '@components/layout/ExercisesCard/ExercisesForm/ExercisesForm';

import styles from '@components/layout/ExercisesCard/ExercisesCard.module.css';

const ExercisesCard = () => {
  return (
    <Card>
      <div className={styles.exercisesCard__title}>
        <span>Exercises</span>
        <Modal title="Add exercise" trigger="Add Exercise">
          <ExercisesForm />
        </Modal>
      </div>
    </Card>
  );
};

export default ExercisesCard;
