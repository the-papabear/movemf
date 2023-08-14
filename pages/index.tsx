import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';

import { Workouts } from '@/pages/Workouts/Workouts';
import { Exercises } from '@/pages/Exercises/Exercises';

import styles from 'styles/Home.module.css';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>MoveMF - Get a move on!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {status === 'unauthenticated' ? (
        <span>You must log in</span>
      ) : (
        <Root defaultValue="workouts-tab" className={styles.wrapper}>
          <List className={styles.tabList}>
            <Trigger value="workouts-tab" className={styles.tabTrigger}>
              Workouts
            </Trigger>
            <Trigger value="exercises-tab" className={styles.tabTrigger}>
              Exercises
            </Trigger>
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
