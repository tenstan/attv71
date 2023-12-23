import type { PageLoad } from "./$types";

interface Post {
  slug: string;
  html: string;
  title: string;
  date: string;
}

export interface HomePageData {
  posts: Post[]
}

export const load: PageLoad = async (): Promise<HomePageData> => {
  const response = await fetch('http://localhost:5173/api/posts');
  const posts = await response.json();

  return {
    ...posts
  };
}