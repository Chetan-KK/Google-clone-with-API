import { defineConfig } from 'vite';

export default defineConfig({
    base: "/Google-clone-with-API/",
    server: {
        origin: 'http://localhost:3000',
        host: '0.0.0.0',
        fs: {
            strict: true,
        }
    }
});