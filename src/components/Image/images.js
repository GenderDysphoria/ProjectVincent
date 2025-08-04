import fs from 'fs-extra';
import { imageSizeFromFile } from 'image-size/fromFile';
import path from 'node:path';
import sharp from 'sharp';

import { file as fileOperation, hfile } from '#gen/cache';
import { resolve, resolveDist, resolvePublic } from '#gen/config';

const WIDTHS = [ 1920, 1366, 768, 640 ];

export async function getDimensions (source) {
  const relPath = resolvePublic(source);
  const absPath = resolve(relPath);

  if (!await fs.pathExists(absPath)) {
    throw new Error(`Could not find file "${source}"`);
  }

  const { width, height } = await imageSizeFromFile(absPath);
  const ratioH = Math.round((height / width) * 100);
  const ratioW = Math.round((width / height) * 100);

  let orientation = 'wide';
  if (ratioH > 100) {
    orientation = 'tall';
  } else if (ratioH === 100) {
    orientation = 'square';
  }

  const dimensions = {
    width,
    height,
    ratioH,
    ratioW,
    orientation,
  };

  return dimensions;
}

export async function computeSrc (source, { hash } = {}) {
  if (!source) {
    throw new Error('Recieved a null src attribute');
  }
  const relPath = resolvePublic(source);
  const absPath = resolve(relPath);

  if (!await fs.pathExists(absPath)) {
    throw new Error(`Could not find file "${source}"`);
  }

  if (!hash) {
    hash = await hfile(absPath);
  }

  const { width, height } = await getDimensions(source);

  const { dir, ext, name } = path.parse(source);
  const distTargetDir = resolveDist(dir);

  const sizes = [];
  const tasks = [];

  if (ext === '.svg') {
    const outName = `${name}_${hash}${ext}`;
    const outPath = path.join(
      distTargetDir,
      outName
    );

    sizes.push({
      url: path.join(dir, outName),
      width,
      height,
    });

    tasks.push(fs.copy(absPath, outPath));
    return [ sizes.reverse(), tasks ];
  }

  (() => {
    const outName = `${name}_full_${hash}${ext}`;
    const outPath = path.join(
      distTargetDir,
      outName
    );

    sizes.push({
      url: path.join(dir, outName),
      width,
      height,
    });

    tasks.push(fileOperation(relPath, outPath, 'original', async (writePath) => {
      await sharp(absPath)
        .toFile(writePath);
    }));
  })();

  for (const w of WIDTHS) {
    if (w > width) continue;
    const outName = `${name}_${w}w_${hash}${ext}`;
    const outPath = path.join(
      distTargetDir,
      outName
    );

    sizes.push({
      url: path.join(dir, outName),
      width: w,
      height: Math.ceil((w / width) * height),
    });

    tasks.push(fileOperation(relPath, outPath, w, async (writePath) => {
      await sharp(absPath)
        .resize({
          width: w,
          fit: 'contain',
        })
        .toFile(writePath);
    }));
  }

  return [ sizes.reverse(), tasks ];
}
