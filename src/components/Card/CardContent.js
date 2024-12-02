import clsx from 'clsx';

const CssPrefix = 'ui-card-content';
export default function CardContent ({
  component: Component = 'div',
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
