import { PropsWithChildren } from 'react';

import styles from '@components/layout/Layout.module.css';

const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  return <div className={styles.grid}>{children}</div>;
};

export default Layout;
