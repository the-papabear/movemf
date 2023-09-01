import { NextResponse } from 'next/server';

export const makeSuccessResponse = (message?: string, data?: any) => {
  return NextResponse.json({ status: 200, message: message || 'OK', data });
};

export const makeErrorResponse = (code?: number, reason?: string) => {
  let parsedCode = 500;

  if (code) {
    parsedCode = code <= 100 || code >= 599 ? 500 : code;
  }

  return NextResponse.json({ status: parsedCode, reason }, { status: parsedCode });
};
