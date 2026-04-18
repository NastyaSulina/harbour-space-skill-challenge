import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        proxy: {
            '/api': {
                target: 'https://harbour.space',
                changeOrigin: true,
                secure: true,
            },
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/shared/test/setup.ts',
        css: false,
        coverage: {
            exclude: ['**/*.module.css', '**/*.css'],
        },
    },
})
