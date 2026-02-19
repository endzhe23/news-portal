import { NextResponse } from 'next/server';
import newsData from '@/src/data/news.json';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return NextResponse.json(newsData);
}