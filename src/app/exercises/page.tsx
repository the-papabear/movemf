'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';
import Link from 'next/link';
import { MoreHorizontal } from 'react-feather';

import { Button, Dialog, DropdownMenu } from '@/components';
import { CreateOrEditExerciseProps, ExerciseData, ExerciseDTO } from '@/app/exercises/interfaces';

export default function Exercises() {
  const [refetchData, setRefetchData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [exerciseData, setExerciseData] = useState<ExerciseData>({ id: '', name: '', link: '' });

  useEffect(() => {
    const getExercises = async () => {
      const res = await axios.get('/api/exercises');

      setExercises(res.data.data);
    };

    getExercises();
  }, [refetchData]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setExerciseData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (exerciseData.id) {
      axios.patch(`/api/exercises/${exerciseData.id}`, exerciseData);
    } else {
      axios.post('/api/exercises', exerciseData);
    }

    setExerciseData({ id: '', name: '', link: '' });
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setRefetchData(!refetchData);
  };

  const handleDelete = (exerciseId: string) => async () => {
    await axios.delete(`/api/exercises/${exerciseId}`);

    setRefetchData(!refetchData);
  };

  return (
    <>
      <Dialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        trigger={
          <Button onClick={() => setExerciseData({ id: '', name: '', link: '' })} className="my-8 h-8">
            Add Exercise
          </Button>
        }
      >
        <CreateOrEditExercise exerciseData={exerciseData} handleChange={handleChange} submitExercise={handleSubmit} />
      </Dialog>

      <table className="w-full">
        <thead>
          <tr className="rounded border-b-[1px] border-lime-500">
            <th className="text-left text-xs font-light">Name</th>
            <th className="text-right text-xs font-light">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise, index) => (
            <tr key={index} className="h-[60px] hover:bg-lime-100">
              <td>{exercise.name}</td>
              <td>
                <div className="flex justify-end pr-3">
                  <DropdownMenu trigger={<MoreHorizontal width={20} height={20} />}>
                    <>
                      {exercise.link && (
                        <Link
                          href={`https://${exercise.link}`}
                          target="_blank"
                          className="group relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-gray-500 outline-none hover:bg-lime-200 hover:text-gray-600"
                        >
                          Go to link
                        </Link>
                      )}
                      <Dialog
                        title={exercise.name}
                        isModalOpen={isEditModalOpen}
                        setIsModalOpen={setIsEditModalOpen}
                        trigger={
                          <div
                            onClick={() => {
                              setExerciseData({ id: exercise._id, name: exercise.name, link: exercise.link });
                              setIsEditModalOpen(true);
                            }}
                            className="group relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-gray-500 outline-none hover:bg-lime-200 hover:text-gray-600"
                          >
                            Edit
                          </div>
                        }
                      >
                        <CreateOrEditExercise
                          exerciseData={exerciseData}
                          handleChange={handleChange}
                          submitExercise={handleSubmit}
                        />
                      </Dialog>
                      <div
                        onClick={handleDelete(exercise._id)}
                        className="group relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-gray-500 outline-none hover:bg-lime-200 hover:text-gray-600 "
                      >
                        Delete
                      </div>
                    </>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function CreateOrEditExercise({ exerciseData, submitExercise, handleChange }: CreateOrEditExerciseProps) {
  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={submitExercise}>
        <label htmlFor="name">
          <h4>Name</h4>
        </label>
        <input
          required
          type="text"
          name="name"
          value={exerciseData?.name || ''}
          onChange={handleChange}
          className="h-[30px] rounded border border-lime-700"
        />
        <label htmlFor="link">
          <h4>Link</h4>
        </label>
        <input
          type="text"
          name="link"
          value={exerciseData?.link}
          onChange={handleChange}
          className="h-[30px] rounded border border-lime-700"
        />
        <Button type="submit" onClick={() => submitExercise} className="mt-8 self-center">
          Save exercise
        </Button>
      </form>
    </>
  );
}
