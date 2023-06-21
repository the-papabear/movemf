import { PropsWithChildren } from 'react';

import styles from '@components/layout/Layout.module.css';

const Layout = ({ children }: PropsWithChildren) => <div className={styles.layout}>{children}</div>;

export default Layout;
