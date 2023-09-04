import { NextRequest, NextResponse } from 'next/server';

import { getExercises } from '@/backend/domain/exercise/api/getExercises';
import { createExercise } from '@/backend/domain/exercise/api/createExercise';

export async function GET() {
  return await getExercises();
}

export async function POST(req: NextRequest) {
  return await createExercise(req);
}
