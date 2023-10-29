// @ts-nocheck
import type { PageLoad } from "./$types";

export const prerender = true;

interface Post {
  slug: string;
  html: string;
  title: string;
  date: string;
}

export interface HomePageData {
  posts: Post[]
}

export const load = async (): Promise<HomePageData> => {
  const response = await fetch('http://localhost:5173/api/posts');
  const posts = await response.json();

  return {
    ...posts
  };
};null as any as PageLoad;