import Image from 'next/image';

import logo from 'public/logo.png';
import Button from '@components/common/Button/Button';

import styles from '@components/layout/Header/Header.module.css';

const Header = () => {
  return (
    <div className={styles.header__wrapper}>
      <Image src={logo} width="48" height="48" alt="movemf logo" />
      <Button title="Log in" theme="btn__primary" />
    </div>
  );
};

export default Header;
