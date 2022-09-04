#!/usr/bin/env node

import minimist from 'minimist';
import gen from './index.js';

const {
  _: [ command, ...args ],
  ...flags
} = minimist(process.argv.slice(2));

await gen(command, args, flags);
