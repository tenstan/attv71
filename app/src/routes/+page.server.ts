import { getNewsPosts, type NewsPost } from "$lib/server/cms/get-news-posts";
import type { PageServerLoad } from "./$types";

export interface HomePageData {
  posts: NewsPost[]
}

export const load: PageServerLoad = async ({ fetch }): Promise<HomePageData> => {
  const posts = await getNewsPosts(fetch);
  
  return {
    posts
  };
}