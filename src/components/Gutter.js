import { css } from '@emotion/react';
import _styled from '@emotion/styled';
const styled = _styled.default;

const Gutter = styled('div')(({ theme }) => css`
  @media screen and (min-width: ${theme.breakpoints.values.md}) {
    position: relative;
    height: 0;
    left: calc(100% + 1em);
    width: 400px;
    padding: 0 1em;

    @media (max-width: ${theme.breakpoints.values.lg}) {
      width: 300px;
    }
  }

  @media screen and (min-width: ${theme.breakpoints.values.sm}) and (max-width: ${theme.breakpoints.values.md}) {
    float: right;
    width: 300px;
    margin-left: 1em;
    zoom: 0.9;
  }

  @media print {
    page-break-inside: avoid;
    clear: both;

    &:not(.print-inline) {
      float: right;
      width: 40vw;
      margin-left: 1em;
    }
  }
`);
Gutter.displayName = 'Gutter';

export default Gutter;
