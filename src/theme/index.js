
import { createTheme } from '@mui/material/node/styles/index.js';
import cssBaseline from '@mui/material/node/CssBaseline/CssBaseline.js';

import palette from './palette.js';
import typography from './typography.js';


const theme = createTheme({
  palette,
  typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 800,
      lg: 1000,
      xl: 1200,
    },
  },
});

export const globalCss = cssBaseline.styles(theme);

export default theme;
