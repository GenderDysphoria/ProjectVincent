import { styled } from 'essex-emotion';

const Quotation = styled('blockquote')(({ theme }) => ({
  backgroundColor: theme.palette.transBlue.lightest,
  color: theme.palette.text.primary,

  border: `1px solid ${theme.palette.transBlue.main}`,
  boxShadow: `0 1px 3px rgba(${theme.palette.transBlue.main} / 0.5)`,

  fontFamily: theme.typography.fontFamilySecondary,
  fontSize: '0.94rem',
  fontWeight: 300,

  lineHeight: 1.4,
  borderRadius: 5,

  padding: '1.1rem',

  position: 'relative',
  overflow: 'hidden',

  strong: {
    fontWeight: 400,
  },

  '&::before': {
    fontFamily: 'cursive',
    fontWeight: 700,
    display: 'block',
    paddingLeft: 10,
    content: '\\201C',
    fontSize: 50,
    position: 'absolute',
    left: -10,
    top: -16,
    color: theme.palette.transBlue.main,
    textShadow: `0 1px 3px rgba(${theme.palette.transBlue.main} / 0.5)`,
    opacity: 0.8,
  },

  'p:last-child': {
    marginBottom: 0,
  },
}));
Quotation.displayName = 'Quotation';

export default Quotation;
