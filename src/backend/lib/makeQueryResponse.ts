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
  let parsedCode = 500;

  if (code) {
    parsedCode = code <= 100 || code >= 599 ? 500 : code;
  }

  return res.status(parsedCode).json({
    code,
    success: false,
    reason: reason || 'SOMETHING_WENT_WRONG',
  });
};
