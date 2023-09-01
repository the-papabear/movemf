import { NextApiRequest, NextApiResponse } from 'next';

import { getWorkouts } from '@/backend/domain/workout/api/getWorkouts';
import { createWorkout } from '@/backend/domain/workout/api/createWorkout';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await getWorkouts(req, res);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  await createWorkout(req, res);
}
