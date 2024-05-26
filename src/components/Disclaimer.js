import { styled } from 'essex-emotion';

const Disclaimer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.action.disabledBackground,
  color: theme.palette.text.secondary,

  borderBottom: `1px solid ${theme.palette.action.disabled}`,

  fontSize: '0.8rem',
  fontWeight: 300,

  '& strong': {
    fontWeight: 400,
  },
}));

export default Disclaimer;
