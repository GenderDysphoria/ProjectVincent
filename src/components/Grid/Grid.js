/* eslint-disable no-param-reassign */
import { isString, isArray, isNumber } from '@twipped/utils';
import { styled } from 'essex-emotion';
import GridCell from './GridCell.js';

const Grid = styled('div', {
  label: 'Grid',
  doNotForward: [
    'columns',
    'rows',
    'colSpacing',
    'rowSpacing',
    'spacing',
  ],
})(
  ({
    theme, columns, rows, spacing, colSpacing, rowSpacing,
  }) => ({
    display: 'grid',
    ...(() => {
      if (isNumber(columns)) columns = [ ...Array(columns) ].map(() => '1fr').join(' ');
      else if (isArray(columns)) columns = columns.map((v) => (isNumber(v) ? `${v}fr` : v)).join(' ');
      if (columns) return { gridTemplateColumns: columns };
      return undefined;
    })(),
    ...(() => {
      if (isNumber(rows)) rows = [ ...Array(rows) ].map(() => '1fr').join(' ');
      else if (isArray(rows)) rows = rows.map((v) => (isNumber(v) ? `${v}fr` : v)).join(' ');
      if (rows) return { gridTemplateRows: rows };
      return undefined;
    })(),
    ...(() => {
      const style = {};
      if (isNumber(spacing) || isString(spacing)) {
        style.gridGap = (isNumber(spacing) ? theme.spacing(spacing) : spacing);
      }

      if (isNumber(colSpacing) || isString(colSpacing)) {
        style.columnGap = (isNumber(colSpacing) ? theme.spacing(colSpacing) : colSpacing);
      }

      if (isNumber(rowSpacing) || isString(rowSpacing)) {
        style.rowGap = (isNumber(rowSpacing) ? theme.spacing(rowSpacing) : rowSpacing);
      }

      return style;
    })(),
  })
);

Grid.displayName = 'Grid';
Grid.Cell = GridCell;

export default Grid;
