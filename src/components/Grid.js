import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import FlexCell from './FlexCell';
import { isNumber, isArray, isString } from '@twipped/utils/types';
import GridCell from './GridCell';

const Grid = styled(FlexCell, {
  shouldForwardProp: (prop) => ![
    'columns',
    'rows',
    'colSpacing',
    'rowSpacing',
    'spacing',
  ].includes(prop),
})(
  {
    display: 'grid',
  },
  ({ columns }) => {
    if (isNumber(columns)) columns = [ ...Array(columns) ].map(() => '1fr').join(' ');
    else if (isArray(columns)) columns = columns.map((v) => (isNumber(v) ? v + 'fr' : v)).join(' ');
    if (columns) return { gridTemplateColumns: columns };
  },
  ({ rows }) => {
    if (isNumber(rows)) rows = [ ...Array(rows) ].map(() => '1fr').join(' ');
    else if (isArray(rows)) rows = rows.map((v) => (isNumber(v) ? v + 'fr' : v)).join(' ');
    if (rows) return { gridTemplateRows: rows };
  },
  ({ spacing, colSpacing, rowSpacing }) => {
    const style = {};
    if (isNumber(spacing) || isString(spacing)) {
      style.gridGap = (isNumber(spacing) ? `${Number(spacing)}px` : spacing);
    }

    if (isNumber(colSpacing) || isString(colSpacing)) {
      style.columnGap = (isNumber(colSpacing) ? `${Number(colSpacing)}px` : colSpacing);
    }

    if (isNumber(rowSpacing) || isString(rowSpacing)) {
      style.rowGap = (isNumber(rowSpacing) ? `${Number(rowSpacing)}px` : rowSpacing);
    }

    return style;
  }
);

Grid.displayName = 'Grid';
Grid.propTypes = {
  ...FlexCell.propTypes,

  /*
   * Element type. Defaults to "div"
   */
  as: PropTypes.elementType,

  /*
   * Column structure. Can either be a css string for grid-template-columns,
   * a number of columns to create, or an array of number/string values for each column.
   */
  columns: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
  ]),

  /*
   * Row structure. Can either be a css string for grid-template-rows,
   * a number of columns to create, or an array of number/string values for each column.
   */
  rows: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
  ]),

  /*
   * Spacing between columns. May be either a string to pass directly, or a pixel number
   * Overrides `spacing`.
   */
  colSpacing: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  /*
   * Spacing between rows. May be either a string to pass directly, or a pixel number.
   * Overrides `spacing`.
   */
  rowSpacing: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  /*
   * Spacing between rows and columns. May be either a string to pass directly, or a pixel number.
   */
  spacing: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
Grid.Cell = GridCell;

export default Grid;
