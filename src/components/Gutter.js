import { styled } from 'essex-emotion';

const Gutter = styled('div')(({ theme }) => ({
  [`@media screen and (min-width: ${theme.breakpoints.values.md})`]: {
    position: 'relative',
    height: 0,
    left: 'calc(100% + 1em)',
    width: 400,
    padding: '0 1em',

    [`@media (max-width: ${theme.breakpoints.values.lg})`]: {
      width: 300,
    },
  },

  [`@media screen and (min-width: ${theme.breakpoints.values.sm}) and (max-width: ${theme.breakpoints.values.md})`]: {
    float: 'right',
    width: 300,
    marginLeft: '1em',
    zoom: 0.9,
  },


  '@media print': {
    pageBreakInside: 'avoid',
    clear: 'both',

    '&:not(.print-inline)': {
      float: 'right',
      width: '40vw',
      marginLeft: '1em',
    },
  },
}));
Gutter.displayName = 'Gutter';

export default Gutter;
