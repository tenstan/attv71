import type { SvelteComponent } from "svelte";

export const fetchMarkdownPosts = () => {
  const modules = import.meta.glob('/src/routes/posts/**/*.md', { eager: true });

  return Object.entries(modules).map(([filepathToModule, module]) => {
    const svelteModule = module as SvelteComponent;

    const relativePathFromRoutes = filepathToModule.split('/routes/')[1];
    
    const slug = relativePathFromRoutes.replace('.md', '');
    const { metadata } = svelteModule;
    const { html } = svelteModule.default.render();

    return {
      slug,
      html,
      ...metadata
    }
  })
}