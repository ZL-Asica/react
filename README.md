# React Utilities (by ZL Asica) 🚀

[![npm version][npm-version-badge]][npm-versions-link]
[![License][license-badge]][license-link]
[![Node.js][node-badge]][node-link]
[![pnpm Version][pnpm-badge]][pnpm-link] |
[![React][react-badge]][react-link]
[![Vitest][vitest-badge]][vitest-link]
[![Eslint][eslint-badge]][eslint-link]
[![Prettier][prettier-badge]][prettier-link]

This repository is **NOT** a reimplementation of React itself. It is a collection of reusable React hooks, utilities, and tools to enhance development productivity. 🎉

## Features

- 🚀 Lightweight and optimized hooks and utilities for React projects.
- 📦 Fully typed with TypeScript for better developer experience.
- 🔒 Clean and consistent utilities for DOM, state, and async operations.
- ✅ 100% (almost) test coverage with robust testing using Vitest.

## Installation

Install the package via `pnpm`, `npm`, or `yarn`:

```bash
# With pnpm
pnpm add @zl-asica/react
# With npm
npm install @zl-asica/react
# With yarn
yarn add @zl-asica/react
```

## Usage

### Example: `useToggle`

```tsx
import { useToggle } from '@zl-asica/react';

const App = () => {
  const [isToggled, toggle] = useToggle(false);

  return <button onClick={toggle}>{isToggled ? 'ON' : 'OFF'}</button>;
};
```

For more examples, check the [documentation](./docs/README.md).

## Contributing

Contributions are welcome! Feel free to open an issue or submit a PR. ❤️

## License

This project is licensed under the [MIT License](./LICENSE).

<!-- Badges / Links -->

[eslint-badge]: https://img.shields.io/badge/eslint-4B32C3?logo=eslint&logoColor=white
[eslint-link]: https://www.npmjs.com/package/eslint-config-zl-asica
[license-badge]: https://img.shields.io/github/license/ZL-Asica/react
[license-link]: https://github.com/ZL-Asica/react/blob/main/LICENSE
[node-badge]: https://img.shields.io/badge/node%3E=18.18-339933?logo=node.js&logoColor=white
[node-link]: https://nodejs.org/
[npm-version-badge]: https://img.shields.io/npm/v/@zl-asica/react
[npm-versions-link]: https://www.npmjs.com/package/@zl-asica/react
[pnpm-badge]: https://img.shields.io/github/package-json/packageManager/ZL-Asica/react?label=&logo=pnpm&logoColor=fff&color=F69220
[pnpm-link]: https://pnpm.io/
[prettier-badge]: https://img.shields.io/badge/Prettier-F7B93E?logo=Prettier&logoColor=white
[prettier-link]: https://www.npmjs.com/package/@zl-asica/prettier-config
[react-badge]: https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB
[react-link]: https://react.dev/
[vitest-badge]: https://img.shields.io/badge/vitest-6E9F18?logo=vitest&logoColor=white
[vitest-link]: https://vitest.dev/
