import { NextApiRequest, NextApiResponse } from 'next';

import { getWorkout } from '@/backend/domain/workout/api/getWorkout';

export async function GET(req: NextApiRequest) {
  await getWorkout(req);
}
