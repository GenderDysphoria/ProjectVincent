import { createLoader } from '@mdx-js/node-loader';

const mdxLoader = createLoader({
  jsxRuntime: 'automatic',
  jsxImportSource: 'essex',
  development: true,
});

/**
 * Load `file:` URLs to MD(X) files.
 */
export const load = mdxLoader.load;
