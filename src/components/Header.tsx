import Image from 'next/image';
import { useRouter } from 'next/router';
import * as AvatarCircle from '@radix-ui/react-avatar';
import { signIn, signOut, useSession } from 'next-auth/react';

import logo from 'public/logo.svg';
import { Button, DropdownMenu, DropdownMenuItem } from '@/components';

export const Header = () => {
  const router = useRouter();
  const { status, data } = useSession();

  const profileImg = data?.user?.image;
  const usernameInitials = data?.user?.name![0];

  const onUserSignIn = () => {
    signIn();
    router.push('/');
  };

  const onUserSignOut = () => {
    signOut();
    router.push('/');
  };

  return (
    <div className="flex items-center justify-between">
      <Image width={45} height={45} alt="logo" src={logo} onClick={() => router.push('/')} />
      {status === 'unauthenticated' ? (
        <Button onClick={onUserSignIn}>Sign In</Button>
      ) : (
        <>
          <DropdownMenu trigger={<Avatar initials={usernameInitials} profileImg={profileImg} />}>
            <DropdownMenuItem name="Sign out" onItemClick={onUserSignOut} />
          </DropdownMenu>
        </>
      )}
    </div>
  );
};

//TODO: FIX ANY
const Avatar = ({ initials, profileImg }: any) => {
  return (
    <AvatarCircle.Root className="bg-gray-300 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <AvatarCircle.Image src={profileImg || ''} />
      <AvatarCircle.Fallback className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium">
        {initials}
      </AvatarCircle.Fallback>
    </AvatarCircle.Root>
  );
};
