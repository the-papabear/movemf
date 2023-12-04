'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
// @ts-ignore
import { usePathname } from 'next/navigation';

import Button from '@/components/Button';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="mb-12 flex w-full items-center justify-between gap-6">
      <Link href="/workouts" className="hidden justify-between sm:block">
        Logo
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
