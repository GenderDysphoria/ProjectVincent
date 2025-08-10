import clsx from 'clsx';

const CssPrefix = 'ui-article';
export default function Note ({
  component: Component = 'article',
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
