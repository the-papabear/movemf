import { NextApiRequest, NextApiResponse } from 'next';

import { getWorkout } from '@/backend/domain/workout/api/getWorkout';
import { editWorkout } from '@/backend/domain/workout/api/editWorkout';

export async function GET(req: NextApiRequest) {
  await getWorkout(req);
}

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  await editWorkout(req, res);
}
