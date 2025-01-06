import clsx from 'clsx';

/**
 * @typedef TextProps
 * @property {string} [component]
 * @property {'title'|'lower'|'upper'} [case]
 * @property {'balance'|'nowrap'|'pretty'|'pre'} [wrap]
 * @property {'primary'|'secondary'|'brand'|'mono'} [family]
 * @property {'xs'|'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'5xl'} [size]
 * @property {'light'|'regular'|'medium'|'bold'} [weight]
 * @property {'primary'|'secondary'|'disabled'|'icon'|'success'|'info'|'warning'|'danger'|'muted'} [color]
 * @property {boolean} [truncate]
 */

const CssPrefix = 'ui-text';

export default function Text ({
  component: Component = 'span',
  truncate,
  case: casing,
  wrap,
  family,
  size,
  weight,
  color,
  className,
  children,
  style,
  italic,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix,
    truncate === true && `${CssPrefix}--truncate`,
    typeof truncate === 'number' && `${CssPrefix}--truncate-lines`,
    casing && `${CssPrefix}--case-${casing}`,
    wrap && `${CssPrefix}--wrap-${wrap}`,
    family && `${CssPrefix}--family-${family}`,
    weight && `${CssPrefix}--weight-${weight}`,
    size && `${CssPrefix}--size-${size}`,
    color && `${CssPrefix}--color-${color}`,
    italic && `${CssPrefix}--italic`
  );

  style = typeof truncate === 'number'
    ? {
        ...style,
        '--text-truncate-lines': truncate,
      }
    : style;

  return (
    <Component {...props} className={classes} style={style}>{children}</Component>
  );
}
