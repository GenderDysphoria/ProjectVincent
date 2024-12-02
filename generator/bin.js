#!/usr/bin/env node

import minimist from 'minimist';
import { register } from 'node:module';

register(import.meta.resolve('./loader-mdx.js'));
register(import.meta.resolve('import-essex'));

const {
  _: [ command, ...args ],
  ...flags
} = minimist(process.argv.slice(2));

const { default: gen } = await import('./index.js');
await gen(command, args, flags);
