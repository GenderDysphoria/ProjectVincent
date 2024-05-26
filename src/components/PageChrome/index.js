

import { styled } from 'essex-emotion';
import Header from './Header.js';
import TopNav from './TopNav.js';
import Sidenav from './Sidenav.js';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function SiteChrome ({ children }) {
  return (
    <StyledRoot>
      <Header />
      <TopNav>
        <Sidenav />
      </TopNav>
      <Main>
        {children}
      </Main>
    </StyledRoot>
  );
}
