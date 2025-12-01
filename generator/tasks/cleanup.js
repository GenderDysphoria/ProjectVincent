// import { promisify } from 'node:util';
import glob from 'fast-glob';
import { rimraf } from 'rimraf';

export default async function cleanup (source, options = {}) {
  const {
    cwd = process.cwd(),
    deep,
    followSymbolicLinks = true,
    ignore,
    dot = true,
  } = options;

  const inputs = await glob(source, {
    cwd,
    deep,
    followSymbolicLinks,
    ignore,
    onlyFiles: false,
    dot,
  });

  await Promise.all(
    inputs.map((f) => rimraf(f, { glob: false }))
  );
}
