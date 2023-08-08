import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Button } from '@/common';
import $ from '@/layout/Header.module.css';

export const Header = () => {
  const router = useRouter();
  const { status, data } = useSession();
  const username = data?.user?.name;

  const onUserSignIn = () => {
    signIn();
    router.push('/');
  };

  const onUserSignOut = () => {
    signOut();
    router.push('/');
  };

  return (
    <div className={$['header__wrapper']}>
      <span className={$['header__logo']} onClick={() => router.push('/')}>
        🏋️ MoveMF
      </span>
      {status === 'unauthenticated' ? (
        <Button onClick={onUserSignIn}>Sign In</Button>
      ) : (
        <div className={$['header__username']}>
          <span>Hello, {username?.split(' ')[0] || 'My Friend'}!</span>
          <Button onClick={onUserSignOut}>Sign Out</Button>
        </div>
      )}
    </div>
  );
};
