import axios from 'axios';

import { WorkoutDTO } from '@/pages/Workouts/interfaces';

interface WorkoutsOverviewProps {
  workouts: WorkoutDTO[];
}

export const WorkoutsOverview = ({ workouts }: WorkoutsOverviewProps) => {
  const onDuplicateClick = async (workout: WorkoutDTO) => {
    const { completedAt, ...parsedWorkout } = workout;

    await axios.post('/api/workouts', parsedWorkout);
  };

  return (
    <div className="flex flex-col p-4">
      {workouts.map((workout, index) => (
        <div key={index} className="flex gap-8">
          <span className="p-2 rounded hover:bg-gray-300 cursor-default">
            {workout.name || 'Unnamed workout'} - {new Date(workout.completedAt).toLocaleString()}
          </span>
          <button onClick={() => onDuplicateClick(workout)}>Duplicate</button>
        </div>
      ))}
    </div>
  );
};
