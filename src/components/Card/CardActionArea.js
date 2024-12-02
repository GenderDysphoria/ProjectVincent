import clsx from 'clsx';

const CssPrefix = 'ui-card-action-area';
export default function CardActionArea ({
  component: Component = 'button',
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
