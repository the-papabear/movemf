import Image from "next/image";

import logo from "@/public/logo.png";

import styles from "@components/layout/Header/Header.module.css";

const Header = () => {
  return (
    <div className={styles.header__wrapper}>
      <Image width="48" height="48" alt="movemf logo" src={logo} />
      <button className={styles.header__btn}>Log in</button>
    </div>
  );
};

export default Header;
