export const workoutAggregation = [
  {
    $lookup: {
      from: 'exerciseDetails',
      localField: 'exerciseDetails',
      foreignField: '_id',
      as: 'exerciseDetails',
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
      exerciseDetails: '$exerciseDetails',
    },
  },
];
