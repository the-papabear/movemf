import { NextApiRequest } from 'next';

import { deleteSet } from '@/backend/domain/set/api/deleteSet';

export default async function DELETE(req: NextApiRequest) {
  return await deleteSet(req);
}
