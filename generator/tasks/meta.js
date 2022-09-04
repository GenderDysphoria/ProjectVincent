
import path from 'node:path';
import fs from 'fs-extra';
import glob from 'fast-glob';

async function loadPages (options = {}) {
  const {
    cwd = process.cwd(),
    deep,
    followSymbolicLinks = true,
    ignore,
    dot = true,
    pageGlob = 'public/**/*.mdx',
  } = options;

  const inputs = await glob(pageGlob, {
    cwd,
    deep,
    followSymbolicLinks,
    ignore,
    onlyFiles: true,
    dot,
  });

  const pages = {};
  const routes = {};

  await Promise.all(
    inputs.map(async (relPath) => {
      const contents = await fs.readFile(relPath, 'utf8');

      const [ , metaTag ] = contents.match(/<Meta\s([\w\W]+?)\s\/>/) || [];
      if (!metaTag) return;

      const meta = {
        file: relPath,
      };

      for (const [ , key, value ] of metaTag.matchAll(/(\w+)="([^"]+?)"/g)) {
        meta[key] = value;
      }

      if (!meta.lang) {
        [ , meta.lang ] = relPath.match(/\/(..)\//) || [];
      }

      if (!meta.url) {
        [ , meta.url ] = relPath.match(/public(\/.+?)(?:index)?\.(?:mdx|jsx?)/);
      }

      pages[relPath] = meta;
      routes[meta.url] = meta.file;
    })
  );

  return { pages, routes };
}

async function loadIndexes (options = {}) {
  const {
    cwd = process.cwd(),
    deep,
    followSymbolicLinks = true,
    ignore,
    dot = true,
    indexGlob = 'public/*/_index.json',
  } = options;

  const inputs = await glob(indexGlob, {
    cwd,
    deep,
    followSymbolicLinks,
    ignore,
    onlyFiles: true,
    dot,
  });

  const languages = {};

  await Promise.all(
    inputs.map(async (relPath) => {
      const contents = await fs.readFile(relPath, 'utf8');
      const language = JSON.parse(contents);
      languages[language.lang] = language;
    })
  );

  return languages;
}

export default async function buildManifest (options = {}) {
  const {
    cwd = process.cwd(),
    destination = 'src/manifest.json',
  } = options;

  const [ { pages, routes }, languages ] = await Promise.all([
    loadPages(options),
    loadIndexes(options),
  ]);

  const destPath = path.resolve(cwd, destination);
  await fs.ensureFile(destPath);
  await fs.writeFile(destPath, JSON.stringify({ pages, routes, languages }, null, 2));
}
