'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import logo from 'public/logo.svg';
import Button from '@/components/Button';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="mb-12 flex w-full items-center justify-between gap-6">
      <Link href="/workouts" className="hidden justify-between sm:block">
        <Image width={32} height={32} alt="logo" src={logo} className="cursor-pointer self-start" />
      </Link>

      <div className="flex gap-4">
        <Link href="/workouts" className="cursor-pointer text-base hover:text-lime-900">
          Workouts
          {pathname === '/workouts' && <div className="h-[2px] rounded border-[1px] border-lime-500" />}
        </Link>
        <Link href="/exercises" className="cursor-pointer text-base hover:text-lime-900">
          Exercises
          {pathname === '/exercises' && <div className="h-[2px] rounded border-[1px] border-lime-500" />}
        </Link>
      </div>
      <div>
        <Button title="Sign out" onClick={() => signOut({ redirect: true })} />
      </div>
    </header>
  );
}
