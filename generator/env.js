import path from 'node:path';
import envSchema from 'env-schema';
import AJV from 'ajv';
import addFormats from 'ajv-formats';
import { ROOT_DIR } from './pkg.js';

const { separator } = envSchema.keywords;

const ajv = new AJV({
  allErrors: true,
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  allowUnionTypes: true,
  addUsedSchema: false,
  keywords: [ separator ],
});
addFormats(ajv);


const ENV = envSchema({
  ajv,
  dotenv: {
    path: path.resolve(ROOT_DIR, '.env'),
  },
  schema: {
    type: 'object',
    properties: {
      NODE_ENV: {
        type: 'string',
        enum: [
          'test',
          'development',
          'production',
        ],
        default: 'development',
      },
      LOG_LEVEL: {
        type: 'string',
        enum: [
          'none',
          'fatal',
          'error',
          'warn',
          'info',
          'debug',
          'trace',
        ],
        default: 'info',
      },
      HOST: {
        type: 'string',
        format: 'hostname',
        default: '0.0.0.0',
      },
      PORT: {
        type: 'integer',
        default: 8080,
      },
      INFRA_LOG_LEVEL: {
        type: 'string',
        enum: [
          'none',
          'error',
          'warn',
          'info',
          'log',
          'verbose',
        ],
        default: 'none',
      },
      BABEL_ENV: {
        type: 'string',
      },
      USE_REACT_REFRESH: {
        type: 'boolean',
        default: true,
      },
    },
  },
});

Object.assign(process.env, ENV);

export default ENV;
