'use client';

import styles from './Header.module.scss';

interface HeaderProps {
  onContactClick: () => void;
}

export const Header = ({ onContactClick }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
         <img 
          src="/images/logo.svg" 
          alt="Логотип" 
          className={styles.logoImage}
        />
      </a>
      <button className={styles.contactButton} onClick={onContactClick}>
        Связаться с нами
      </button>
    </header>
  );
};
