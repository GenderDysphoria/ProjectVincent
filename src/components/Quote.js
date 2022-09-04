import { css } from '@emotion/react';
import { rgba } from 'emotion-rgba';
import _styled from '@emotion/styled';
const styled = _styled.default;

const Quotation = styled('blockquote')(({ theme }) => css`
  background-color: ${theme.palette.transBlue.lightest};
  color: ${theme.pallete.text.primary}

  border: 1px solid ${theme.palette.transBlue.main};
  box-shadow: 0 1px 3px ${rgba(theme.palette.transBlue.main, 0.5)};

  font-family: ${theme.typography.fontFamilySecondary};
  font-size: 0.94rem;
  font-weight: 300;

  line-height: 1.4;
  border-radius: 5px;

  padding: 1.1rem;

  position: relative;
  overflow: hidden;

  strong {
    font-weight: 400;
  }

  &::before {
    font-family: cursive;
    font-weight: 700;
    display: block;
    padding-left: 10px;
    content: "\201C";
    font-size: 50px;
    position: absolute;
    left: -10px;
    top: -16px;
    color: ${theme.palette.transBlue.main};
    text-shadow: 0 1px 3px ${rgba(theme.palette.transBlue.main, 0.5)};;
    opacity: 0.8;
  }

  p:last-child {
    margin-bottom: 0;
  }
`);
Quotation.displayName = 'Quotation';

export default Quotation;
