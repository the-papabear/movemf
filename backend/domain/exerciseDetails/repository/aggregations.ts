export const exerciseDetailsAggregation = [
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
];
