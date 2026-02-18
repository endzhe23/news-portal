'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { NewsCard } from '@/components/NewsCard/NewsCard';
import { ContactForm } from '@/components/ContactForm/ContactForm';
import type { NewsItem } from '@/src/types/news';
import styles from './page.module.scss';

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Ошибка загрузки новостей:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header onContactClick={() => setIsContactFormOpen(true)} />

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Новости</h1>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner} />
            </div>
          ) : (
            <div className={styles.newsGrid}>
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />
    </div>
  );
}
