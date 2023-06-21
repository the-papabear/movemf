import { PropsWithChildren } from 'react';

import { Root, Item, Trigger, Content } from '@radix-ui/react-accordion';

import styles from '@components/common/Accordion/Accordion.module.css';

type AccordionProps = {
  label: string;
};

const Accordion = ({ children, label }: PropsWithChildren<AccordionProps>) => (
  <Root collapsible type="single" className={styles.accordion__container}>
    <Item value="Card">
      <Trigger className={styles.accordion__trigger}>{label}</Trigger>
      <Content>{children}</Content>
    </Item>
  </Root>
);

export default Accordion;
