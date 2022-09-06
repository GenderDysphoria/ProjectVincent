import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';

const GridCell = styled(Box, {
  shouldForwardProp: (prop) => ![
    'col',
    'colSpan',
    'row',
    'rowSpan',
  ].includes(prop),
})(
  ({ col }) => ( col && {
    gridColumnStart: col,
  }),
  ({ colSpan }) => (colSpan && {
    gridColumnEnd: `span ${colSpan}`,
  }),
  ({ colEnd }) => (colEnd && {
    gridColumnEnd: colEnd,
  }),
  ({ row }) => ( row && {
    gridRowStart: row,
  }),
  ({ rowSpan }) => ( rowSpan && {
    gridRowEnd: `span ${rowSpan}`,
  }),
  ({ rowEnd }) => (rowEnd && {
    gridRowEnd: rowEnd,
  })
);

GridCell.displayName = 'GridCell';
GridCell.propTypes = {

  /**
   * Column to start drawing at
   */
  col: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * Number of columns to span across
   */
  colSpan: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * Column to span until. Conflicts with `colSpan`
   */
  colEnd: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * Row to start at.
   */
  row: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * Row to span until. Conflicts with `rowSpan`
   */
  rowEnd: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * Number of rows to span across. Conflicts with `rowEnd`
   */
  rowSpan: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default GridCell;
