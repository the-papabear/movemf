import Image from 'next/image';

import logo from '@/public/logo.png';

import styles from '@components/layout/Header/Header.module.css';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  return (
    <div className={styles.header__wrapper}>
      <Image
        src={logo}
        width="48"
        height="48"
        alt="movemf logo"
        onClick={() => router.push('/')}
        className={styles.header__logo}
      />
      <button className={styles.header__btn}>Log in</button>
    </div>
  );
};

export default Header;
