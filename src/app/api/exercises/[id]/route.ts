import { NextRequest } from 'next/server';

import { getExercise } from '@/backend/domain/exercise/api/getExercise';
import { editExercise } from '@/backend/domain/exercise/api/editExercise';
import { deleteExercise } from '@/backend/domain/exercise/api/deleteExercise';

export async function GET(req: NextRequest) {
  return await getExercise(req);
}

export async function PATCH(req: NextRequest) {
  return await editExercise(req);
}

export async function DELETE(req: NextRequest) {
  return await deleteExercise(req);
}
