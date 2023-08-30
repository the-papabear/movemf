import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import * as AvatarCircle from '@radix-ui/react-avatar';
import { signIn, signOut, useSession } from 'next-auth/react';

import logo from 'public/logo.svg';
import { DropdownMenu, DropdownMenuItem } from '@/components';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useSession();

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
    <div className="w-full h-[80px] flex flex-col items-center gap-6 mb-4">
      <div className="flex items-center justify-between w-full h-[80px]">
        <Image width={40} height={40} alt="logo" src={logo} onClick={() => router.push('/')} className="self-start" />

        <div className="flex gap-4 self-end md:self-start md:mt-4">
          <div className="text-lg cursor-pointer" onClick={() => router.push('/')}>
            Workouts
            {pathname === '/' && <div className="h-[2px] border-[1px] border-lime-500 rounded " />}
          </div>
          <div className="text-lg cursor-pointer" onClick={() => router.push('/exercises')}>
            Exercises
            {pathname === '/exercises' && <div className="h-[2px] border-[1px] border-lime-500 rounded " />}
          </div>
        </div>
        <div className="self-start">
          <DropdownMenu trigger={<Avatar initials={usernameInitials} profileImg={profileImg} />}>
            <DropdownMenuItem name="Sign out" onItemClick={onUserSignOut} />
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

//TODO: FIX ANY
const Avatar = ({ initials, profileImg }: any) => {
  return (
    <AvatarCircle.Root className="bg-gray-300 drop-shadow-lg inline-flex h-[40px] w-[40px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <AvatarCircle.Image src={profileImg || ''} />
      <AvatarCircle.Fallback className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium">
        {initials}
      </AvatarCircle.Fallback>
    </AvatarCircle.Root>
  );
};
