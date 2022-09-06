import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styled from '@emotion/styled';
import cl from '@twipped/utils/cl';
import FlexCell from './FlexCell';

const FlexRowRoot = styled(FlexCell)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: stretch;

  &.FlexRow-wrap {
    flex-wrap: wrap;
  }

  &.FlexRow-justify-left {
    justify-content: flex-start;
  }

  &.FlexRow-justify-center {
    justify-content: center;
  }

  &.FlexRow-justify-right {
    justify-content: flex-end;
  }

  &.FlexRow-justify-between {
    justify-content: space-between;
  }

  &.FlexRow-justify-around {
    justify-content: space-around;
  }

  &.FlexRow-justify-stretch {
    justify-content: stretch;
  }

  &.FlexRow-align-top {
    align-items: flex-start;
  }

  &.FlexRow-align-center {
    align-items: center;
  }

  &.FlexRow-align-bottom {
    align-items: flex-end;
  }

  &.FlexRow-align-stretch {
    align-items: stretch;
  }
`;

const Row = forwardRef(function FlexRow ({
  center,
  justify,
  align,
  className,
  wrap = false,
  style,
  ...props
}, ref) {
  if (center) {
    justify = 'center';
    align = 'center';
  }

  return (
    <FlexRowRoot
      {...props}
      ref={ref}
      className={cl(
        className,
        'FlexRow',
        justify && `FlexRow-justify-${justify}`,
        align && `FlexRow-align-${align}`,
        wrap && 'FlexRow-wrap'
      )}
      style={style}
    />
  );
});
Row.propTypes = {
  ...FlexCell.propTypes,

  /*
   * Element type. Defaults to "div"
   */
  as: PropTypes.elementType,

  /*
   * Cells should wrap around the end of the row.
   * Defaults to false
   */
  wrap: PropTypes.bool,

  /*
   * Shorthand for align:center and justify:center
   */
  center: PropTypes.bool,

  /*
   * Horizontal alignment
   * Defaults to 'stretch'
   */
  justify: PropTypes.oneOf([
    'left',
    'center',
    'right',
    'between',
    'around',
    'stretch',
  ]),

  /*
   * Vertical alignment
   * Defaults to 'stretch'
   */
  align: PropTypes.oneOf([
    'top',
    'center',
    'bottom',
    'stretch',
  ]),
};

export default Row;
