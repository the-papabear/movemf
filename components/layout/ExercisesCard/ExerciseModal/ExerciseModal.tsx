import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import {
  Root,
  Close,
  Title,
  Portal,
  Overlay,
  Content,
  Trigger,
} from '@radix-ui/react-dialog';

import closeIcon from 'public/closeIcon.svg';
import Button from '@components/common/Button/Button';
import ExercisesForm from '@components/layout/ExercisesCard/ExercisesForm/ExercisesForm';

import styles from '@components/layout/ExercisesCard/ExerciseModal/ExerciseModal.module.css';

type ModalProps = {
  title?: string;
  exercises: any;
  setExercises: any;
};

const Modal = ({ title, exercises, setExercises }: ModalProps) => {
  const [values, setValues] = useState({
    name: '',
    link: '',
  });

  const handleNameInputChange = (event: any) => {
    event.persist();
    setValues((values) => ({
      ...values,
      name: event.target.value,
    }));
  };

  const handleLinkInputChange = (event: any) => {
    event.persist();
    setValues((values) => ({
      ...values,
      link: event.target.value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const onExerciseSubmit = async () => {
    const exercise = {
      name: values.name,
      link: values.link,
    };

    await axios.post('api/exercises', exercise);

    setExercises([...exercises, exercise]);
    setValues({ name: '', link: '' });
  };

  return (
    <Root>
      <Trigger className={styles.modal__trigger}>Add Exercise</Trigger>
      <Portal>
        <Overlay className={styles.modal__overlay}>
          <Content className={styles.modal__content}>
            <div className={styles.modal__header__wrapper}>
              <Title>{title}</Title>
              <Close className={styles.modal__close}>
                <Image
                  width={16}
                  height={16}
                  src={closeIcon}
                  alt="close icon"
                />
              </Close>
            </div>
            <ExercisesForm
              values={values}
              handleSubmit={handleSubmit}
              handleLinkInputChange={handleLinkInputChange}
              handleNameInputChange={handleNameInputChange}
            />
            <Close className={styles.modal__submit}>
              <Button title="Add exercise" onClick={onExerciseSubmit} />
            </Close>
          </Content>
        </Overlay>
      </Portal>
    </Root>
  );
};

export default Modal;
