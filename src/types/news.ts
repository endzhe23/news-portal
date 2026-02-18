export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  image: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  agreement: boolean;
}
