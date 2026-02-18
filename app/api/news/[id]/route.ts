import { NextResponse } from 'next/server';
import newsData from '@/src/data/news.json';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const news = newsData.find((item) => item.id === id);

  if (!news) {
    return NextResponse.json({ error: 'Новость не найдена' }, { status: 404 });
  }

  return NextResponse.json(news);
}
