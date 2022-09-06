import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { isUndefinedOrNull } from '@twipped/utils/types';
import Box from '@mui/material/Box';

const FlexCell = forwardRef(function FlexCell ({
  as: Component = Box,
  style = null,
  grow,
  shrink,
  basis,
  auto,
  fill,
  ...props
}, ref) {

  style = {
    ...style,
  };

  if (grow === true) grow = 1;
  if (grow === false) grow = 0;
  if (shrink === true) shrink = 1;
  if (shrink === false) shrink = 0;

  if (fill) {
    style.flex = `1 1 ${basis || 'auto'}`;
  } else {
    if (!isUndefinedOrNull(grow)) style.flexGrow = grow;
    if (!isUndefinedOrNull(shrink)) style.flexShrink = shrink;
    if (basis) style.flexBasis = basis;
    else if (auto) style.flexBasis = 'auto';
  }

  return (
    <Component
      {...props}
      ref={ref}
      style={style}
    />
  );
});
FlexCell.propTypes = {
  as: PropTypes.elementType,

  grow: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),

  shrink: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),

  basis: PropTypes.string,

  auto: PropTypes.bool,

  fill: PropTypes.bool,
};

export default FlexCell;
