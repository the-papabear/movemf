'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';

export default function Workout() {
  const [exercises, setExercises] = useState<any>();

  useEffect(() => {
    getExercises();

    async function getExercises() {
      const exercises = (await axios.get('/api/exercises')).data.data;
      setExercises(exercises);
    }
  }, []);

  return <span>Creating a new workout</span>;
}
