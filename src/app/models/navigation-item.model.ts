export interface NavigationItem {
  label: string;
  link: string;
  children?: NavigationItem[];
  badge?: string;
  isActive?: boolean;
}

export interface ServiceItem {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  active?: boolean;
}

export interface BlogPost {
  title: string;
  image: string;
  category: string;
  date: string;
  author: string;
  authorAvatar: string;
}