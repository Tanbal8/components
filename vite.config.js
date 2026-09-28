import { defineConfig, esmExternalRequirePlugin } from 'vite';
import react from '@vitejs/plugin-react';

const injectCss = () => ({
    name: 'inject-css',
    generateBundle(_, bundle) {
        for (const file of Object.values(bundle)) {
            if (file.type === 'chunk' && file.isEntry) {
                file.code = `import './index.css';\n${file.code}`;
            }
        }
    },
});

export default defineConfig({
    plugins: [
        react(),
        injectCss(),
        esmExternalRequirePlugin({
            external: [
                'react',
                'react/jsx-runtime',
                /^react-icons(\/.*)?$/,
            ],
        }),
    ],
    build: {
        lib: {
            entry: './index.js',
            formats: ['es'],
            fileName: 'index',
        },
    },
});