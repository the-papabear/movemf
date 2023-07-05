import styles from '@components/layout/Header/Header.module.css';

const Header = () => {
  return (
    <div className={styles.header__wrapper}>
      <span style={{ fontSize: '28px' }}>🏆 MoveMF</span>
    </div>
  );
};

export default Header;
