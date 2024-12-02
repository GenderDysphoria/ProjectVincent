import { isNotUndefinedOrNull } from '@twipped/utils';
import clsx from 'clsx';

const CssPrefix = 'ui-grid-cell';
export default function GridCell ({
  component: Component = 'div',
  col,
  row,
  colSpan,
  rowSpan,
  colEnd,
  rowEnd,
  className,
  style,
  children,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix
  );

  style = {
    gridColumnStart: col,
    gridColumnEnd: isNotUndefinedOrNull(colSpan) ? `span ${colSpan}` : colEnd,
    gridRowStart: row,
    gridRowEnd: isNotUndefinedOrNull(rowSpan) ? `span ${rowSpan}` : rowEnd,
    ...style,
  };

  return <Component {...props} style={style} className={classes} />;
}
