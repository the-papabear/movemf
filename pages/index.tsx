import { useEffect, useState } from 'react';

import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';

import Card from '@components/common/Card/Card';
import Modal from '@components/common/Modal/Modal';
import Accordion from '@components/common/Accordion/Accordion';
import ExercisesForm from '@components/layout/ExercisesForm/ExercisesForm';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();

  const [exercises, setExercises] = useState<any>([]);

  useEffect(() => {
    (async function getExercises() {
      const { data } = await axios('http://localhost:4000/api/exercises');

      setExercises(data);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>MoveMF - Get a move on!</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Accordion label="Workouts">
        <Card>
          <button
            onClick={() => {
              router.push('/workouts');
            }}
          >
            Start Workout
          </button>
        </Card>
      </Accordion>
      <Accordion label="Exercises">
        <Card>
          <Modal title="Add exercise" trigger="Add Exercise">
            <ExercisesForm />
          </Modal>
          {exercises.map((exercise: any, index: number) => (
            <span key={index}>{exercise.name}</span>
          ))}
        </Card>
      </Accordion>
    </>
  );
}
