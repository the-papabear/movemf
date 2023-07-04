import Head from 'next/head';
import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';

import { Exercises, Workouts } from '@components/pages';

import styles from 'styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>MoveMF - Get a move on!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
    </>
  );
}
