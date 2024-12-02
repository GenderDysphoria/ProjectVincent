import clsx from 'clsx';

import Stack from '#src/components/Stack';

const CssPrefix = 'ui-card-actions';
export default function CardContent ({
  component: Component = Stack,
  className,
  children,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix
  );

  return (
    <Component {...props} className={classes}>{children}</Component>
  );
}
