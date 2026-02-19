import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logo}>
           <img 
            src="/images/logoFooter.svg" 
            alt="Логотип" 
            className={styles.logoImage}
           />
        </div>
        <div className={styles.title}>Креативное агентство 500NA700</div>
      </div>
    </footer>
  );
};
