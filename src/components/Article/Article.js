import clsx from 'clsx';

const CssPrefix = 'ui-article';
export default function Article ({
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
