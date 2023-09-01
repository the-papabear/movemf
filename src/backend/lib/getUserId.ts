import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';

import { authOptions } from '@/lib/auth';

export async function getUserId(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    throw new Error('NO_SESSION');
  }

  const user = session?.user as any;
  return user.id;
}
