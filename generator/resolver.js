import { promisify } from 'node:util';
import enhancedResolve from 'enhanced-resolve';

const resolveCallback = enhancedResolve.create({
  extensions: [ '.js', '.jsx', '.mdx', '.cjs', '.mjs', '.ts', '.tsx', '.json', '.node' ],
  conditionNames: [ 'node', 'import' ],
});

const resolveSync = enhancedResolve.create.sync({
  extensions: [ '.js', '.jsx', '.mdx', '.cjs', '.mjs', '.ts', '.tsx', '.json', '.node' ],
  conditionNames: [ 'node', 'import' ],
});

const resolver = promisify(resolveCallback);
resolver.sync = resolveSync;

export default resolver;
