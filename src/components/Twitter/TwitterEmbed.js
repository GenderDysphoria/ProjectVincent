import clsx from 'clsx';

const CssPrefix = 'twitter';
export default function TwitterEmbed ({
  component: Component = 'div',
  className,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix
  );
  return <Component {...props} className={classes} />;
}
