import { css } from '@emotion/react';
import _styled from '@emotion/styled';
const styled = _styled.default;

const Note = styled('div')(({ theme }) => css`
  background-color: ${theme.palette.action.selected}
  color: ${theme.pallete.text.secondary}

  border-bottom: 1px solid ${theme.palette.action.disabled};

  font-size: 0.8rem;
  font-weight: 300;

  & strong {
    font-weight: 400;
  }
`);
Note.displayName = 'Note';

export default Note;
