import Image from 'next/image';

import logo from 'public/logo.png';

import styles from '@components/layout/Header/Header.module.css';
import { useRouter } from 'next/router';
import Button from '@components/common/Button/Button';

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
      <Button title="Log in" theme="btn__primary" />
    </div>
  );
};

export default Header;
