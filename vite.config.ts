import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: '0.0.0.0', // Allow external connections (required for Railway)
		port: parseInt(process.env.PORT || '3000', 10), // Use Railway's PORT variable
	},
});
