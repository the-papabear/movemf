'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

import logo from 'public/logo.svg';
import { Button } from '@/components';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="mb-4 flex h-[80px] w-full flex-col items-center gap-6">
      <div className="flex h-[80px] w-full items-center justify-between">
        <Image
          width={40}
          height={40}
          alt="logo"
          src={logo}
          onClick={() => router.push('/')}
          className="cursor-pointer self-start"
        />

        <div className="flex gap-4 self-end md:my-2 md:self-start">
          <div className="cursor-pointer text-lg hover:text-lime-900" onClick={() => router.push('/')}>
            Workouts
            {pathname === '/' && <div className="h-[2px] rounded border-[1px] border-lime-500" />}
          </div>
          <div className="cursor-pointer text-lg hover:text-lime-900" onClick={() => router.push('/exercises')}>
            Exercises
            {pathname === '/exercises' && <div className="h-[2px] rounded border-[1px] border-lime-500" />}
          </div>
        </div>
        <div className="self-start md:my-2">
          <Button onClick={() => signOut({ redirect: true })}>Sign out</Button>
        </div>
      </div>
    </header>
  );
};
