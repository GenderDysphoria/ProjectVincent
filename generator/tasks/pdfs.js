import log from 'fancy-log';
import fs from 'fs-extra';
import path from 'node:path';
import puppeteer from 'puppeteer';

import { resolve, ROOT_DIR } from '#gen/config';

import { serverWatchTask } from './server.js';

export default async function pdfs () {
  const manifest = await fs.readJSON(resolve('compiled', 'manifest.json'));
  const disposeServer = await serverWatchTask();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const lang of Object.values(manifest.languages)) {
    const distPath = resolve('public', lang.lang, 'gdb.pdf');

    await page.goto(`http://127.0.0.1:8080/${lang.lang}/fulltext`);
    await page.emulateMediaType('print');
    await page.pdf({ path: distPath, format: 'A4' });
    log(`    Wrote ${path.relative(ROOT_DIR, distPath)}`);
  }

  await browser.close();
  await disposeServer();
}
