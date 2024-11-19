/// <reference types="vitest" />
import path from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Use global variables
    environment: 'jsdom', // Use jsdom as the test environment
    setupFiles: './vitest.setup.ts', // Load the setup file
    include: ['src/**/*.test.{ts,tsx}'], // Include test files
    coverage: {
      provider: 'v8', // Use V8 coverage
      reporter: ['text', 'lcov'], // Output text and html reports
      include: ['src'], // Include source code only
      exclude: [
        'src/__tests__',
        'src/index.ts',
        'src/hooks/index.ts',
        'src/utils/index.ts',
      ],
    },
    alias: {
      '@': path.resolve('./src'), // Alias @ to src
    },
  },
});
