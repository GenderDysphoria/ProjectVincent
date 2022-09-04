
import path from 'node:path';
import fs from 'fs-extra';
import babel from '@babel/core';
import glob from 'fast-glob';


export default async function compileMDX (source, destination, options = {}) {
  const {
    cwd = process.cwd(),
    deep,
    followSymbolicLinks = true,
    ignore,
    dot = true,
    ext = '.js',
  } = options;


  const inputs = glob.stream(source, {
    cwd,
    deep,
    followSymbolicLinks,
    ignore,
    onlyFiles: true,
    dot,
  });

  await fs.ensureDir(destination);

  for await (const relPath of inputs) {
    const f = path.parse(relPath);
    f.root = destination;
    f.ext = ext;

    const destPath = path.format({
      dir: path.resolve(cwd, destination, f.dir),
      name: f.name,
      ext,
    });

    try {
      const contents = await fs.readFile(relPath);
      const { code, map } = await babel.transformAsync(contents, {
        filename: relPath,
        sourceMaps: true,
        babelrc: false,
        ignore: [],
        presets: [
          [
            '@babel/preset-env', {
              useBuiltIns: 'entry',
              corejs: 3,
              exclude: [ 'transform-typeof-symbol' ],
              modules: false,
              targets: 'maintained node versions',
            },
          ],
          [ '@babel/preset-react', {
            runtime: 'automatic',
          } ],
        ],
        plugins: [
          [ 'babel-plugin-add-import-extension', { extension: 'js' } ],
        ],
      });

      await fs.ensureFile(destPath);
      await fs.writeFile(destPath, code);
      await fs.writeFile(destPath + '.map', JSON.stringify(map));

    } catch (e) {
      e.message = `Error Compiling "${relPath}", ${e.message}`;
      throw e;
    }
  }
}
