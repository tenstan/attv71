// @ts-nocheck
import type { ComponentType, SvelteComponent } from "svelte";
import type { PageLoad } from "./$types";

export interface MarkdownData {
  markdownContent: ComponentType;
  title: string;
}

export const load = async ({ params }: Parameters<PageLoad>[0]): Promise<MarkdownData> => {
  const post: SvelteComponent = await import(`../${params.slug}.md`);
  const { title } = post.metadata;
  const markdownContent = post.default;

  return {
    markdownContent,
    title
  }
}