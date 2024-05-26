import { styled } from 'essex-emotion';

const Note = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.action.selected,
  color: theme.pallete.text.secondary,

  borderBottom: `1px solid ${theme.palette.action.disabled}`,

  fontSize: '0.8rem',
  fontWeight: 300,

  '& strong': {
    fontWeight: 400,
  },
}));
Note.displayName = 'Note';

export default Note;
