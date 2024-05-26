#!/usr/bin/env node

// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { register } from 'node:module';
import minimist from 'minimist';

register(import.meta.resolve('./loader-mdx.js'));
register(import.meta.resolve('./loader.js'));

const {
  _: [ command, ...args ],
  ...flags
} = minimist(process.argv.slice(2));

const { default: gen } = await import('./index.js');
await gen(command, args, flags);
