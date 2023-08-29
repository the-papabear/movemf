'use client';

import { useSession } from 'next-auth/react';
import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';

import { Workouts } from '@/components/pages/Workouts/Workouts';
import { Exercises } from '@/components/pages/Exercises/Exercises';

export default function Home() {
  const { status } = useSession();

  return (
    <>
      {status === 'unauthenticated' ? (
        <span>You must log in</span>
      ) : (
        <Root defaultValue="workouts-tab">
          <List>
            <Trigger value="workouts-tab">Workouts</Trigger>
            <Trigger value="exercises-tab">Exercises</Trigger>
          </List>
          <Content value="workouts-tab">
            <Workouts />
          </Content>
          <Content value="exercises-tab">
            <Exercises />
          </Content>
        </Root>
      )}
    </>
  );
}
