import type { SvelteComponent } from "svelte";

export const fetchMarkdownPosts = () => {
  const modules = import.meta.glob('/src/routes/posts/**/*.md', { eager: true });
  
  let totalPosts = 0;

  const posts = Object.entries(modules).map(([filepathToModule, module]) => {
    totalPosts++;

    const markdownComponent = module as SvelteComponent;

    const relativePathFromRoutes = filepathToModule.split('/routes/')[1];
    const slug = relativePathFromRoutes.replace('.md', '');

    return {
      slug,
      html: markdownComponent.default.render().html,
      title: markdownComponent.metadata.title,
      date: markdownComponent.metadata.date
    }
  }).reverse();

  return {
    posts,
    totalPosts
  }
}
