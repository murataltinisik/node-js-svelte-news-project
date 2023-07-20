import svelte from 'rollup-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess/dist/autoProcess';

export default {
	plugins: [
		svelte({
			preprocess: sveltePreprocess(),
			dev: !production,
			css: (css) => {
				css.write('public/bundle.css');
			},
		}),
	],
};
