import { gitignoreToMinimatch } from '@humanwhocodes/gitignore-to-minimatch';
import findUp from 'find-up';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const FLAT_CONFIG_FILENAMES = [
  'eslint.config.js',
  'eslint.config.mjs',
  'eslint.config.cjs',
];

/**
 * Searches from the current working directory up until finding the
 * given flat config filename.
 *
 * @see {@link https://github.com/eslint/eslint/blob/38c159e7dda812ce6dfdbf8c5b78db7cdd676c62/lib/eslint/eslint.js#L260-L271}
 *
 * @returns {string|undefined} The filename if found or `undefined` if not.
 */
function findFlatConfigFileSync () {
  return findUp.sync(FLAT_CONFIG_FILENAMES);
}

/**
 * @returns {string[]}
 */
export default function resolveIgnoresFromGitignore () {
  const configFile = findFlatConfigFileSync();

  if (!configFile) {
    return [];
  }

  /** @type {string[]} */
  const result = [];

  try {
    const content = readFileSync(path.join(path.dirname(configFile), '.gitignore'), 'utf8');

    for (let line of content.split('\n')) {
      line = line.trim();

      if (line && !line.startsWith('#')) {
        result.push(gitignoreToMinimatch(line));
      }
    }
  } catch {}

  return result;
}
