import { ObjectId } from 'mongodb';

export const exercises = [
  { _id: new ObjectId(), name: 'Pull-ups' },
  { _id: new ObjectId(), name: 'Push-ups' },
  { _id: new ObjectId(), name: 'Plank', link: 'google.com' },
  { _id: new ObjectId(), name: 'Squats', link: 'lorempisumn.com' },
  { _id: new ObjectId(), name: 'Rest', type: 'REST' },
];

export const set = [
  {
    reps: 3,
    weight: 10,
    setNumber: 1,
    _id: new ObjectId(),
    insertedAt: new Date(),
    exercise: exercises[0]._id,
    workoutId: new ObjectId('64c1819bbeef6d0a84352e6a'),
  },
  {
    reps: 3,
    weight: 10,
    setNumber: 1,
    _id: new ObjectId(),
    insertedAt: new Date(),
    exercise: exercises[1]._id,
    workoutId: new ObjectId('64c1819bbeef6d0a84352e6a'),
  },
  {
    time: 60,
    setNumber: 1,
    _id: new ObjectId(),
    insertedAt: new Date(),
    exercise: exercises[4]._id,
    workoutId: new ObjectId('64c1819bbeef6d0a84352e6a'),
  },
  {
    reps: 10,
    setNumber: 2,
    _id: new ObjectId(),
    insertedAt: new Date(),
    exercise: exercises[2]._id,
    workoutId: new ObjectId('64c1819bbeef6d0a84352e6a'),
  },
  {
    reps: 10,
    setNumber: 2,
    _id: new ObjectId(),
    insertedAt: new Date(),
    exercise: exercises[2]._id,
    workoutId: new ObjectId('64c1819bbeef6d0a84352e6a'),
  },
];

export const workouts = [
  {
    _id: new ObjectId('64c1819bbeef6d0a84352e6a'),
    completedAt: new Date(),
    set: set.map((set) => set._id),
  },
];
