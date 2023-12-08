'use client';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import * as singInWithGoogle from 'public/sign-in-with-google.svg';
import { Badge } from '@/components/ui/badge';

const LoginPage = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 rounded border bg-white p-10">
        <h1 className="mb-10 text-xl font-bold">MoveMF</h1>
        <Button disabled={true}>Login to Demo Account</Button>
        <Badge variant="secondary">Coming soon</Badge>
        <span>- OR -</span>
        <Button variant="ghost" onClick={() => signIn('google')} className="bg-[#F2F2F2]">
          <Image src={singInWithGoogle} alt="Neutral color Google sing in image" />
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
