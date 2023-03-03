import { PropsWithChildren } from "react";

import * as AccordionItems from "@radix-ui/react-accordion";

import styles from "@components/common/Accordion/Accordion.module.css";

type AccordionProps = {
  label: string;
};

const Accordion = ({ children, label }: PropsWithChildren<AccordionProps>) => (
  <AccordionItems.Root
    collapsible
    type="single"
    className={styles.accordion__container}
  >
    <AccordionItems.Item value="Card">
      <AccordionItems.Trigger className={styles.accordion__trigger}>
        {label}
      </AccordionItems.Trigger>
      <AccordionItems.Content>{children}</AccordionItems.Content>
    </AccordionItems.Item>
  </AccordionItems.Root>
);

export default Accordion;
