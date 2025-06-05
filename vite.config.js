import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                background: 'src/background/background.js',
                content: 'src/content/content.js',
                popup: 'src/popup/popup.html',
            },
            output: {
                entryFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name][extname]',
            },
        },
    },
    publicDir: 'public',
})
