import type { PageLoad } from "./$types";

export const prerender = true;

interface Post {
  slug: string;
  title: string;
  date: string;
  html: string;
}

export interface HomePageData {
  posts: Post[]
}

export const load: PageLoad = async (): Promise<HomePageData> => {
  const response = await fetch('http://localhost:5173/api/posts');
  const posts = await response.json();

  return {
    posts
  };
}