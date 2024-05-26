
import { mapReduce, ucfirst } from '@twipped/utils';
import baseTheme from './baseTheme.js';

const FONT_FAMILY_SANS = [
  'ui-sans-serif',
  'system-ui',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
];

const FONT_WEIGHTS = {
  thin: 100,
  lite: 300,
  regular: 400,
  bold: 700,
  heavy: 900,
};

const FONT_FAMILIES = {
  primary: [ 'Lato', 'Arial', ...FONT_FAMILY_SANS ].join(' '),
  secondary: [ 'Gothic A1', 'Helvetica Neue', 'Helvetica', ...FONT_FAMILY_SANS ].join(' '),
  heading: [ 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', ...FONT_FAMILY_SANS ].join(' '),
  monospace: [ 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace' ].join(' '),
};

export const weightVariants = mapReduce(FONT_WEIGHTS,
  (v, k) => [ k, { fontWeight: v } ]
);

const weightInjects = mapReduce(FONT_WEIGHTS,
  (v, k) => [ `weight${ucfirst(k)}`, { fontWeight: v } ]
);

export const familyVariants = mapReduce(FONT_FAMILIES,
  (v, k) => [ k, { fontFamily: v } ]
);

const familyInjects = mapReduce(FONT_FAMILIES,
  (v, k) => [ `family${ucfirst(k)}`, { fontFamily: v } ]
);

export const sizeVariants = {
  xs: {
    fontSize: '0.75rem',
  },
  sm: {
    fontSize: '0.875rem',
  },
  md: {
    fontSize: '1rem',
  },
  lg: {
    fontSize: '1.15rem',
  },
  xl: {
    fontSize: '1.25rem',
  },
  '2xl': {
    fontSize: '1.5rem',
  },
  '3xl': {
    fontSize: '2.2rem',
  },
};

export const styleVariants = {
  h1: {
    ...familyVariants.familyHeading,
    ...sizeVariants['3xl'],
    ...weightVariants.lite,
  },
  h2: {
    ...familyVariants.familyHeading,
    ...sizeVariants['2xl'],
    ...weightVariants.lite,
  },
  h3: {
    ...familyVariants.heading,
    ...sizeVariants['2xl'],
    ...weightVariants.regular,
  },
  h4: {
    ...familyVariants.heading,
    ...sizeVariants.xl,
    ...weightVariants.bold,
  },
  h5: {
    ...familyVariants.heading,
    ...sizeVariants.lg,
    ...weightVariants.bold,
  },
  h6: {
    ...familyVariants.heading,
    ...sizeVariants.md,
    ...weightVariants.bold,
  },
  subtitle1: {
    ...sizeVariants.md,
    ...weightVariants.lite,
  },
  subtitle2: {
    ...sizeVariants.md,
    ...weightVariants.thin,
  },
  body1: {
    ...sizeVariants.md,
  },
  body2: {
    ...sizeVariants.sm,
  },
  button: {
    ...sizeVariants.md,
  },
  caption: {
    ...sizeVariants.sm,
  },
  overline: {
    ...sizeVariants.xs,
  },

  code: {
    ...familyVariants.monospace,
    color: baseTheme.palette.grey[200],
    backgroundColor: baseTheme.palette.grey[600],
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 2,
    paddingRight: 2,
    display: 'inline-block',
  },

  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

export default {
  fontSize: 14,
  fontFamily: FONT_FAMILIES.primary,

  ...sizeVariants,
  ...weightInjects,
  ...familyInjects,
  ...styleVariants,


};
