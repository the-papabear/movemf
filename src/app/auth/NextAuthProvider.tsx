'use client';

import { SessionProvider } from 'next-auth/react';

export const NextAuthProvider = ({ children }: React.PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};
