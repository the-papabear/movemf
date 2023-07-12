import { PropsWithChildren } from 'react';

import styles from '@/layout/Layout.module.css';

const Layout = ({ children }: PropsWithChildren) => <div className={styles.layout}>{children}</div>;

export default Layout;
