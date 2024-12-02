import clsx from 'clsx';

import Paper from '#src/components/Paper';

const CssPrefix = 'ui-gutter';
export default function Gutter ({
  component,
  className,
  children,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix
  );

  return (
    <Paper component={component} {...props} className={classes}>{children}</Paper>
  );
}
