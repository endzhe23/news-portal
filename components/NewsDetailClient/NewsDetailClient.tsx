'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import type { NewsItem } from '@/src/types/news';
import styles from './NewsDetailClient.module.scss';

interface NewsDetailClientProps {
  news: NewsItem;
}

export const NewsDetailClient = ({ news }: NewsDetailClientProps) => {
  return (
    <div className={styles.wrapper}>
      <Header onContactClick={() => {}} />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.imageWrapper}>
              <Image
                src={news.image}
                alt={news.title}
                width={600}
                height={400}
                className={styles.image}
                priority
              />
            </div>

            <div className={styles.textContent}>
              <h1 className={styles.title}>{news.title}</h1>
              <p className={styles.date}>{news.date}</p>
              <p className={styles.description}>{news.content}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
