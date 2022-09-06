import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styled from '@emotion/styled';
import cl from '@twipped/utils/cl';
import FlexCell from './FlexCell';

const FlexColumnRoot = styled(FlexCell)`
  display: flex;
  align-self: stretch;
  flex-flow: column nowrap;

  &.FlexColumn-wrap {
    flex-wrap: wrap;
  }

  &.FlexColumn-scrollable {
    overflow-x: hidden;
    overflow-y: auto;
  }

  &.FlexColumn-align-top {
    justify-content: flex-start;
  }

  &.FlexColumn-align-center {
    justify-content: center;
  }

  &.FlexColumn-align-bottom {
    justify-content: flex-end;
  }

  &.FlexColumn-align-between {
    justify-content: space-between;
  }

  &.FlexColumn-align-around {
    justify-content: space-around;
  }

  &.FlexColumn-align-stretch {
    justify-content: stretch;
  }

  &.FlexColumn-justify-left {
    align-items: flex-start;
  }

  &.FlexColumn-justify-center {
    align-items: center;
  }

  &.FlexColumn-justify-right {
    align-items: flex-end;
  }

  &.FlexColumn-justify-stretch {
    align-items: stretch;
  }
`;

const FlexColumn = forwardRef(function FlexColumn ({
  justify,
  align,
  className,
  style,
  scrollable = false,
  wrap = false,
  children,
  ...props
}, ref) {
  return (
    <FlexColumnRoot
      {...props}
      ref={ref}
      className={cl(
        className,
        justify && `FlexColumn-justify-${justify}`,
        align && `FlexColumn-align-${align}`,
        scrollable && 'FlexColumn-scrollable',
        wrap && 'FlexColumn-wrap'
      )}
      style={style}
    >
      {children}
    </FlexColumnRoot>
  );
});
FlexColumn.propTypes = {
  ...FlexCell.propTypes,

  /*
   * Element type. Defaults to "div"
   */
  as: PropTypes.elementType,

  /*
   * Cells should wrap around the end of the column.
   * Defaults to false
   */
  wrap: PropTypes.bool,

  /*
   * Makes the column scrollable within its boundaries
   * Defaults to false
   */
  scrollable: PropTypes.bool,

  /*
   * Vertical alignment
   * Defaults to 'stretch'
   */
  align: PropTypes.oneOf([
    'top',
    'center',
    'bottom',
    'between',
    'around',
    'stretch',
  ]),

  /*
   * Horizontal alignment
   * Defaults to 'stretch'
   */
  justify: PropTypes.oneOf([
    'left',
    'center',
    'right',
    'stretch',
  ]),
};

export default FlexColumn;
