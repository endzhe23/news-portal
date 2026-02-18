import Link from 'next/link';
import Image from 'next/image';
import type { NewsItem } from '@/src/types/news';
import styles from './NewsCard.module.scss';

interface NewsCardProps {
  news: NewsItem;
}

export const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <Link href={`/news/${news.id}`} className={styles.card}>
      <Image
        src={news.image}
        alt={news.title}
        width={400}
        height={200}
        className={styles.image}
        priority={false}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{news.title}</h3>
        <p className={styles.description}>{news.description}</p>
        <p className={styles.date}>{news.date}</p>
      </div>
    </Link>
  );
};
