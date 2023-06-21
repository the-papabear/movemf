import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';

import { Exercises, Workouts } from '@components/layout';
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
      <Content value="workouts-tab">
        <Workouts />
      </Content>
      <Content value="exercises-tab">
        <Exercises />
      </Content>
    </Root>
  );
};
