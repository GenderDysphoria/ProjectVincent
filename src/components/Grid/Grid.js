import { isArray, isNumber } from '@twipped/utils';
import clsx from 'clsx';

const CssPrefix = 'ui-grid';
export default function Grid ({
  component: Component = 'div',
  columns = 12,
  rows,
  spacing,
  rowSpacing,
  colSpacing,
  wrapCells,
  className,
  style,
  children,
  width,
  height,
  ...props
}) {
  if (isNumber(columns)) columns = [ ...Array(columns) ].map(() => '1fr').join(' ');
  else if (isArray(columns)) columns = columns.map((v) => (isNumber(v) ? v + 'fr' : v)).join(' ');
  else if (!columns) columns = undefined;

  if (isNumber(rows)) rows = [ ...Array(rows) ].map(() => '1fr').join(' ');
  else if (isArray(rows)) rows = rows.map((v) => (isNumber(v) ? v + 'fr' : v)).join(' ');
  else if (!rows) rows = undefined;

  const classes = clsx(
    className,
    CssPrefix
  );

  style = {
    gridTemplateColumns: columns,
    gridTemplateRows: rows,
    gridColumnGap: colSpacing ?? spacing,
    gridRowGap: rowSpacing ?? spacing,
    width,
    height,
    ...style,
  };

  return <Component {...props} style={style} className={classes} />;
}
