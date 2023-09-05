export const workoutAggregation = [
  {
    $unwind: {
      path: '$sets',
    },
  },
  {
    $lookup: {
      from: 'exercises',
      localField: 'sets.exercise',
      foreignField: '_id',
      as: 'sets.exercise',
    },
  },
  {
    $unwind: {
      path: '$sets.exercise',
    },
  },
  {
    $group: {
      _id: '$_id',
      name: {
        $first: '$name',
      },
      userId: {
        $first: '$userId',
      },
      sets: {
        $push: {
          reps: '$sets.reps',
          weight: '$sets.weight',
          exercise: '$sets.exercise',
          setNumber: '$sets.setNumber',
        },
      },
    },
  },
];
