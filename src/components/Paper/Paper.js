import clsx from 'clsx';

const CssPrefix = 'ui-paper';
export default function Paper ({
  component: Component = 'div',
  size = 'md',
  outlined,
  elevation = 0,
  surface = 0,
  className,
  gutter,
  style,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix,
    size && `${CssPrefix}--${size}`,
    outlined && `${CssPrefix}--outlined`,
    elevation && `${CssPrefix}--elevation-${elevation}`,
    surface && `${CssPrefix}--surface-${surface}`
  );
  style = gutter
    ? {
        ...style,
        ...(gutter && {
          padding: `calc(var(--spacing) * ${Number(gutter)})`,
        }),
      }
    : style;
  return <Component {...props} style={style} className={classes} />;
}
