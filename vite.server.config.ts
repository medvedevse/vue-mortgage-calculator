import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	build: {
		ssr: resolve(__dirname, 'server/server.ts'),
		outDir: 'dist',
		emptyOutDir: true,
		rollupOptions: {
			input: 'server/server.ts',
			output: { format: 'es', dir: 'dist', entryFileNames: 'server.js' },
			external: ['express', 'cors', 'multer'],
			treeshake: {
				moduleSideEffects: false
			}
		},
		target: 'node20',
		sourcemap: true
	},
	resolve: { alias: { '@': resolve(__dirname, './server') } }
})
