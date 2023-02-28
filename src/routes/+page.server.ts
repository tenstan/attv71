import { getArticles } from "$lib/api/articles";
import type { Article } from "$lib/models/article";
import type { PageServerLoad } from "./$types";

export const prerender = true;

export interface HomePageData {
  articles: Article[];
}

export const load: PageServerLoad = async (): Promise<HomePageData> => {
  const articles = await getArticles();

  return {
    articles
  };
}