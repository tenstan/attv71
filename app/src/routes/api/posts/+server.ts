import { fetchMarkdownPosts } from '$lib/markdown/fetch-markdown-posts';
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const markdownPosts = fetchMarkdownPosts();
  
  return json(markdownPosts);
}