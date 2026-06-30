import { transform } from '@svgr/core';
import jsx from '@svgr/plugin-jsx';
import svgo from '@svgr/plugin-svgo';
import Case from 'case';
import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { file as fileOperation, memory as memoryOperation } from '#gen/cache';
import { resolve } from '#gen/config';
import { ROOT_DIR } from '#gen/pkg';

export async function loadIcon (name) {
  const absPath = path.resolve(__dirname, 'icons', `${name}.svg`);
  const relPath = path.relative(ROOT_DIR, absPath);
  const outName = `svgIcons/${name}.js`;
  const outPath = resolve('compiled', outName);

  if (!await fs.pathExists(absPath)) {
    throw new Error(`Could not find icon "${absPath}"`);
  }

  await memoryOperation(relPath, outPath, async (writePath) => {
    const svgCode = await fs.readFile(absPath, { encoding: 'utf-8' });

    const jsCode = await transform(
      svgCode,
      {
        icon: true,
        jsxRuntime: 'automatic',
      },
      {
        componentName: Case.pascal(name),
        filePath: outName,
        caller: {
          name: '#src/component/SvgIcon',
          defaultPlugins: [ svgo, jsx ],
        },
      }
    );

    await fs.ensureFile(outPath);
    await fs.writeFile(outPath, jsCode, { encoding: 'utf-8' });
  });

  return (await import(outPath)).default;
}
