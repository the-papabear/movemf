'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Edit2, Link2, Trash2 } from 'react-feather';

import { CreateOrEditExerciseProps, ExerciseData, ExerciseDTO } from '@/app/exercises/interfaces';

const Exercises = () => {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [exerciseData, setExerciseData] = useState<ExerciseData>({ id: '', name: '', link: '' });

  useEffect(() => {
    const getExercises = async () => {
      const { data } = await axios.get('/api/exercises');

      setExercises(data.data);
      setIsLoading(false);
    };

    getExercises();
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setExerciseData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (exerciseData.id) {
      setIsEditFormOpen(!isEditFormOpen);

      axios.patch(`/api/exercises/${exerciseData.id}`, exerciseData).then((data) => {
        const filteredData = exercises.filter((exercise) => exercise._id !== exerciseData.id);
        setExercises([{ ...data.data.data }, ...filteredData]);
      });
    } else {
      axios.post('/api/exercises', exerciseData).then((data) => setExercises([...exercises, { ...data.data.data }]));
    }

    setExerciseData({ id: '', name: '', link: '' });
    setIsCreateFormOpen(false);
  };

  const handleDelete = (exerciseId: string) => async () => {
    const data = exercises.filter((exercise) => exercise._id !== exerciseId);
    setExercises(data);

    await axios.delete(`/api/exercises/${exerciseId}`);
  };

  const handleAddBtnClick = () => {
    setExerciseData({ id: '', name: '', link: '' });
    setIsCreateFormOpen(!isCreateFormOpen);
    setIsEditFormOpen(false);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {isCreateFormOpen ? (
        <CreateOrEditExercise exerciseData={exerciseData} handleChange={handleChange} submitExercise={handleSubmit} />
      ) : null}
      {isEditFormOpen ? (
        <CreateOrEditExercise exerciseData={exerciseData} handleChange={handleChange} submitExercise={handleSubmit} />
      ) : null}

      <table className="w-full">
        <thead>
          <tr className="rounded border-b-[1px] border-lime-500">
            <th className="text-left text-xs font-light">Name</th>
            <th className="pr-4 text-right text-xs font-light">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td className="pt-4">
                <span className="text-xl">Loading exercises...</span>
              </td>
            </tr>
          ) : (
            exercises.map((exercise, index) => (
              <tr key={index} className="h-[50px] hover:bg-lime-100">
                <td>
                  {exercise.link ? (
                    <Link target="_blank" href={'https://' + exercise.link} className="flex items-center gap-2">
                      {exercise.name} <Link2 width={16} height={16} />
                    </Link>
                  ) : (
                    <span>{exercise.name}</span>
                  )}
                </td>
                <td className="flex justify-end gap-6 p-4">
                  <Edit2
                    width={16}
                    height={16}
                    onClick={() => {
                      setExerciseData({ id: exercise._id, ...exercise });
                      setIsEditFormOpen(!isEditFormOpen);
                    }}
                    className="cursor-pointer text-gray-700 hover:text-gray-500"
                  />
                  <Trash2
                    width={16}
                    height={16}
                    className="cursor-pointer text-red-600 hover:text-red-400"
                    onClick={handleDelete(exercise._id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

function CreateOrEditExercise({ exerciseData, submitExercise, handleChange }: CreateOrEditExerciseProps) {
  return (
    <div className="w-[280px] rounded-md border border-lime-500 p-4">
      <form className="flex flex-col gap-2" onSubmit={submitExercise}>
        <label htmlFor="name">
          <h4>Name</h4>
        </label>
        <input
          required
          id="name"
          type="text"
          name="name"
          autoComplete="name"
          onChange={handleChange}
          value={exerciseData?.name || ''}
          className="h-[30px] rounded border border-lime-700"
        />
        <label htmlFor="link">
          <h4>Link</h4>
        </label>
        <input
          id="link"
          type="text"
          name="link"
          autoComplete="link"
          value={exerciseData?.link}
          onChange={handleChange}
          className="h-[30px] rounded border border-lime-700"
        />
        <div className="self-center"></div>
      </form>
    </div>
  );
}

export default Exercises;
