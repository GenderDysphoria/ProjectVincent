import { styled } from 'essex-emotion';

const GridCell = styled('div', {
  label: 'Grid-Cell',
  doNotForward: [
    'col',
    'colSpan',
    'row',
    'rowSpan',
  ],
})(
  ({
    col, colSpan, colEnd, row, rowSpan, rowEnd,
  }) => ({
    ...(col && {
      gridColumnStart: col,
    }),
    ...(colSpan && {
      gridColumnEnd: `span ${colSpan}`,
    }),
    ...(colEnd && {
      gridColumnEnd: colEnd,
    }),
    ...(row && {
      gridRowStart: row,
    }),
    ...(rowSpan && {
      gridRowEnd: `span ${rowSpan}`,
    }),
    ...(rowEnd && {
      gridRowEnd: rowEnd,
    }),
  })
);

GridCell.displayName = 'GridCell';

export default GridCell;
