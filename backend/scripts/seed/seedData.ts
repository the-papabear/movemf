import { ObjectId } from 'mongodb';

export const exercises = [
  { _id: new ObjectId(), name: 'Pull-ups' },
  { _id: new ObjectId(), name: 'Push-ups' },
  { _id: new ObjectId(), name: 'Plank', link: 'google.com' },
  { _id: new ObjectId(), name: 'Squats', link: 'lorempisumn.com' },
  { _id: new ObjectId(), name: 'Rest', type: 'REST' },
];

export const exerciseDetails = [
  {
    reps: 3,
    weight: 10,
    setNumber: 1,
    _id: new ObjectId(),
    insertedAt: new Date(),
    exercise: exercises[0]._id,
  },
  {
    reps: 3,
    weight: 10,
    setNumber: 1,
    _id: new ObjectId(),
    insertedAt: new Date(),
    exercise: exercises[1]._id,
  },
  {
    time: 60,
    setNumber: 1,
    _id: new ObjectId(),
    insertedAt: new Date(),
    exercise: exercises[4]._id,
  },
  {
    reps: 10,
    setNumber: 2,
    _id: new ObjectId(),
    insertedAt: new Date(),
    exercise: exercises[2]._id,
  },
  {
    reps: 10,
    setNumber: 2,
    _id: new ObjectId(),
    insertedAt: new Date(),
    exercise: exercises[2]._id,
  },
];

export const workouts = [
  {
    _id: new ObjectId(),
    completedAt: new Date(),
    exerciseDetails: exerciseDetails.map((exerciseDetails) => exerciseDetails._id),
  },
];
