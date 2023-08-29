export const workoutAggregation = [
  {
    $lookup: {
      from: 'set',
      localField: 'set',
      foreignField: '_id',
      as: 'set',
      pipeline: [
        {
          $lookup: {
            from: 'exercises',
            localField: 'exercise',
            foreignField: '_id',
            as: 'exercise',
          },
        },
        {
          $addFields: {
            exercise: {
              $first: '$exercise',
            },
          },
        },
      ],
    },
  },
  {
    $addFields: {
      set: '$set',
    },
  },
];
