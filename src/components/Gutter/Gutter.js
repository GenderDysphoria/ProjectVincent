import clsx from 'clsx';

import Paper from '#src/components/Paper';

const CssPrefix = 'ui-gutter';
export default function Gutter ({
  component: Component = 'div',
  className,
  children,
  align,
  printRow,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix,
    align === 'end' && 'flex-end',
    align === 'center' && 'flex-center',
    !!printRow && 'print-row'
  );

  return (
    <Component {...props} className={classes}><Paper>{children}</Paper></Component>
  );
}
