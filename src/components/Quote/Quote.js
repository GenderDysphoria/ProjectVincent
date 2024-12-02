import clsx from 'clsx';

import Paper from '#src/components/Paper';

const CssPrefix = 'ui-quote';
export default function Quote ({
  component = 'blockquote',
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
