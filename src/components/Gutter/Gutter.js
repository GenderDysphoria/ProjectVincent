import clsx from 'clsx';

import Paper from '#src/components/Paper';

const CssPrefix = 'ui-disclaimer';
export default function Disclaimer ({
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
