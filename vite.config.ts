import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src'],
      bundleTypes: true,
      tsconfigPath: './tsconfig.build.json'
    })
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'Plyrue',
      fileName: 'plyrue'
    },
    rollupOptions: {
      // Consumers bring their own Vue and Plyr — never bundle them.
      external: ['vue', 'plyr'],
      output: {
        exports: 'named',
        assetFileNames: 'plyrue[extname]',
        globals: { vue: 'Vue', plyr: 'Plyr' }
      }
    }
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/**/*.spec.ts'],
    setupFiles: ['tests/setup.ts'],
    alias: {
      // Swap the real player for a stub; jsdom/happy-dom cannot run Plyr.
      plyr: fileURLToPath(new URL('./tests/plyr-stub.ts', import.meta.url))
    },
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      reporter: ['text', 'lcov']
    }
  }
});
