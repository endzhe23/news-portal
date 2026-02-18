import { notFound } from 'next/navigation';
import { NewsDetailClient } from '@/components/NewsDetailClient/NewsDetailClient';
import newsData from '@/src/data/news.json';
import type { NewsItem } from '@/src/types/news';

export async function generateStaticParams() {
  return [{ id: newsData[0]?.id || '1' }];
}

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const news = newsData[0];

  if (!news) {
    return {
      title: 'Новость не найдена',
    };
  }

  return {
    title: `${news.title} | Новостной портал`,
    description: news.description,
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const news = newsData[0] as NewsItem | undefined;

  if (!news) {
    notFound();
  }

  return <NewsDetailClient news={news} />;
}