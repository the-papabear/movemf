import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';

import { Exercises } from '@components/layout/Exercises/Exercises';

import styles from 'components/layout/MainContent/MainContent.module.css';

export const MainContent = () => {
  return (
    <Root defaultValue="workouts-tab" className={styles.wrapper}>
      <List className={styles.tabList}>
        <Trigger value="workouts-tab" className={styles.tabTrigger}>
          Workouts
        </Trigger>
        <Trigger value="exercises-tab" className={styles.tabTrigger}>
          Exercises
        </Trigger>
      </List>
      <Content value="workouts-tab"></Content>
      <Content value="exercises-tab">
        <Exercises />
      </Content>
    </Root>
  );
};
