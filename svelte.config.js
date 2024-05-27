import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter(),
        prerender: {
            enabled: true, // Enable prerendering
            include: ['/blog/*', '/jobs/*'] // Prerender all dynamic pages in these paths
        },
    },

    preprocess: [vitePreprocess({})]
};

export default config;
