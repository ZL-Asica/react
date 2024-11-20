# @zl-asica/react

## 0.2.2

### Patch Changes

- Try to support for nextjs

## 0.2.1

### Patch Changes

- add timeout to copy util.

## 0.2.0

### Minor Changes

- First Version ready for Production

  - **Build & Packaging**: Fixed the incomplete build process, ensuring all exports and types are properly included.
  - **Production Readiness**: This is the first usable version of `@zl-asica/react`.
  - Ready for use in modern React (support 19RC) and Next.js (support 15) projects.

## 0.1.6

### Patch Changes

- Fix React peerDependencies issue

## 0.1.5

### Patch Changes

- Update JSDoc, add new functions.

  - Hooks:
    - useInViewport: Hook to check if an element is in the viewport (could provide a offset).
    - useIsBottom: Hook to check if an element is at the bottom of the viewport (could provide a offset).
    - useIsTop: Hook to check if an element is at the top of the viewport (could provide a offset).
    - useKeyPress: Hook to listen to key presses.
    - useScrollProgress: Hook to get the scroll progress of current window (from 0 to 100).
    - useDebouncedCallback: Hook to create a debounced callback.
  - Utils:
    - mathUtils, dateUtils, stringUtils, objectUtils: add new functions.

## 0.1.4

### Patch Changes

- Bump up to test new workflow

## 0.1.3

### Patch Changes

- Update documentation site structure

## 0.1.2

### Patch Changes

- bump version to 0.1.2

## 0.1.1

### Patch Changes

- b588129: Update package.json

## 0.1.0

### ✨ Minor Changes

- Initialize project with core features:
  - Lightweight and reusable React hooks.
  - Fully typed TypeScript support.
  - Organized utilities for async, state, and DOM management.

### 📚 Documentation

- Added initial API documentation.
- Integrated VitePress for generating project documentation.

### ✅ Tests

- Set up basic testing framework using Vitest.
- Achieved ~100% test coverage for core utilities.
