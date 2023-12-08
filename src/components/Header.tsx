'use client';
import { signOut, useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useSession();

  const userImage = data?.user?.image ? data.user.image : '';
  const userInitial = data?.user?.name ? data.user.name[0] : '';

  const handleSignOut = () => signOut({ redirect: true, callbackUrl: '/auth/signin' });
  const handleWorkoutBtnClick = () => router.push('/');
  const handleExercisesBtnClick = () => router.push('/exercises');

  return (
    <header className="flex justify-between">
      <div className="flex gap-2">
        <Button variant={pathname === '/' ? 'link' : 'default'} onClick={handleWorkoutBtnClick}>
          Workouts
        </Button>
        <Button variant={pathname === '/exercises' ? 'link' : 'default'} onClick={handleExercisesBtnClick}>
          Exercises
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={userImage} />
            <AvatarFallback className="border border-black bg-white text-slate-500">{userInitial}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent asChild className="mr-2">
          <DropdownMenuItem>
            <Button onClick={handleSignOut} className="w-full">
              Sign out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
