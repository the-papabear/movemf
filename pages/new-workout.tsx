import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

import { NewWorkout } from '@components/pages/workouts/NewWorkout/NewWorkouts';

export default function Workout() {
  const [exercises, setExercises] = useState<any>();

  useEffect(() => {
    getExercises();

    async function getExercises() {
      const { data } = await axios.get('/api/exercises');
      setExercises(data);
    }
  }, []);

  return (
    <>
      <Head>
        <title>MoveMF - Create Workout</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {exercises ? <NewWorkout exercises={exercises} /> : <h2>Loading...</h2>}
    </>
  );
}
