import { NextRequest } from 'next/server';

import { getWorkouts } from '@/backend/domain/workout/api/getWorkouts';
import { createWorkout } from '@/backend/domain/workout/api/createWorkout';

export async function GET() {
  return await getWorkouts();
}

export async function POST(req: NextRequest) {
  return await createWorkout(req);
}
