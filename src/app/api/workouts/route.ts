import { NextApiRequest, NextApiResponse } from 'next';

import { getWorkouts } from '@/backend/domain/workout/api/getWorkouts';
import { createWorkout } from '@/backend/domain/workout/api/createWorkout';

export async function GET() {
  return await getWorkouts();
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  await createWorkout(req, res);
}
