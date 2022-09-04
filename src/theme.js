import { useMemo, createContext, useContext } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useToggledState from '@twipped/hooks/useToggledState';
import useMemoObject from '@twipped/hooks/useMemoObject';
import merge from 'lodash/merge';

const fontFamily = '"Lato", "Arial", sans-serif';
const fontFamilySecondary = '"Gothic A1", "Helvetica Neue", Helvetica, serif';
const fontFamilyHeading = '"Roboto", "Helvetica Neue", "Helvetica", "Arial", sans-serif';

export const base = {
  typography: {
    fontSize: 14,
    fontFamily,
    fontFamilySecondary,
    fontFamilyHeading,

    disclaimer: {
      fontFamily: fontFamilySecondary,
    },
    h1: {
      fontSize: '2.2rem',
      fontFamily: fontFamilyHeading,
      fontWeight: 300,
    },
    h2: {
      fontFamily: fontFamilyHeading,
      fontSize: '1.5rem',
      fontWeight: 300,
    },
    h3: {
      fontFamily: fontFamilyHeading,
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    h4: {
      fontFamily: fontFamilyHeading,
      fontSize: '1.2rem',
      fontWeight: 600,
    },
    h5: {
      fontFamily: fontFamilyHeading,
      fontSize: '1.15rem',
      fontWeight: 600,
    },
  },

  pallette: {
    primary: {
      main: '#fc0a7e',
      light: '#ff5ead',
      dark: '#c30052',
      contrastText: '#fff',
    },
    secondary: {
      main: '#03a9f4',
      light: '#67daff',
      dark: '#007ac1',
      contrastText: '#000',
    },

    transWhite: {
      main: '#fffff',
    },
    transBlue: {
      lightest: '#f0f8ff',
      light: '#b9eafe',
      main: '#55CDFC',
      dark: '#0377a4',
      darkest: '#025372',
    },
    transPink: {
      lightest: '#fef6f7',
      light: '#fde6eb',
      main: '#F7A8B8',
      dark: '#ee4b6c',
      darkest: '#ea1c46',
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 800,
      lg: 1000,
      xl: 1200,
    },
  },
};

export const light = {
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
};

export const dark = {
  palette: {
    type: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
};

const DarkModeContext = createContext();

export function useDarkMode () {
  return useContext(DarkModeContext);
}

export default function GDBThemeProvider ({ children }) {
  const {
    state: enabled,
    toggle,
  } = useToggledState(useMediaQuery('(prefers-color-scheme: dark)'));

  const theme = useMemo(
    () =>
      createTheme(merge(
        {},
        base,
        enabled ? dark : light
      )),
    [ enabled ]
  );

  const darkModeContext = useMemoObject({
    enabled,
    toggle,
  });

  return (
    <ThemeProvider theme={theme}>
      <DarkModeContext.Provider value={darkModeContext}>
        <CssBaseline />
        {children}
      </DarkModeContext.Provider>
    </ThemeProvider>
  );
}
