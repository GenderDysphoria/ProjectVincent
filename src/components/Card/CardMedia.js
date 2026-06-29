import clsx from 'clsx';

const CssPrefix = 'ui-card-media';
export default function CardMedia ({
  as = 'div',
  component: Component = as,
  className,
  children,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix
  );

  return (
    <Component
      {...props}
      className={classes}
    >
      {children}
    </Component>
  );
}
