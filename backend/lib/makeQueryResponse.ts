import { NextApiResponse } from 'next';

export const makeSuccessResponse = (res: NextApiResponse, message?: string, data?: any) => {
  return res.status(200).json({
    success: true,
    code: 200,
    message,
    data,
  });
};

export const makeErrorResponse = (res: NextApiResponse, code?: number, reason?: string) => {
  return res.status(code || 500).json({
    code: code || 500,
    success: false,
    reason: reason || 'SOMETHING_WENT_WRONG',
  });
};
