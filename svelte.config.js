import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: 'src/routes/posts/md-layout.svelte'
		}),
	],
	kit: {
		adapter: adapter()
	},
	extensions: ['.svelte', '.md']
};

export default config;
