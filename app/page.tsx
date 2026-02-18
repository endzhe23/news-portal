'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import styles from './page.module.scss';

export default function Home() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Header onContactClick={() => setIsContactFormOpen(true)} />
       <Footer />  
    </div>
  );
}
