import { PropsWithChildren } from 'react';

import styles from '@/layout/Layout.module.css';

export const Layout = ({ children }: PropsWithChildren) => <div className={styles.layout}>{children}</div>;
