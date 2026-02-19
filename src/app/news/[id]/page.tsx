import { notFound } from 'next/navigation';
import { NewsDetailClient } from '@/src/components/NewsDetailClient/NewsDetailClient';
import newsData from '@/src/data/news.json';
import type { NewsItem } from '@/src/types/news';

export async function generateStaticParams() {
  return newsData.map((news) => ({
    id: news.id,
  }));
}

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const news = newsData.find((item) => item.id === id);

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
  const { id } = await params;
  const news = newsData.find((item) => item.id === id) as NewsItem | undefined;

  if (!news) {
    notFound();
  }

  return <NewsDetailClient news={news} />;
}
