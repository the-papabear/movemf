import { WorkoutDTO } from '@/pages/Workouts/interfaces';

import styles from '@/pages/Workouts/WorkoutsOverview/WorkoutsOverview.module.css';

interface WorkoutsOverviewProps {
  workouts: WorkoutDTO[];
}

export const WorkoutsOverview = ({ workouts }: WorkoutsOverviewProps) => {
  return (
    <div className="flex flex-col p-4">
      {workouts.map((workout, index) => (
        <span className="p-2 rounded hover:bg-gray-300 cursor-default" key={index}>
          {workout.name || 'Unnamed workout'} - {new Date(workout.completedAt).toLocaleString()}
        </span>
      ))}
    </div>
  );
};
