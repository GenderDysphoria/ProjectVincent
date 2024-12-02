import clsx from 'clsx';

/**
 * @typedef ButtonProps
 * @property {string} [component]
 * @property {'text'|'contained'|'outlined'} [variant]
 * @property {'xs'|'sm'|'md'|'lg'|'xl'} [size]
 * @property {'primary'|'secondary'|'success'|'info'|'warning'|'danger'} [color]
 * @property {boolean} [disabled]
 * @property {boolean} [disableRipple]
 * @property {boolean} [icon]
 * @property {object} [slots]
 * @property {object} [slotProps]
 */

const CssPrefix = 'ui-button';

const COLORS = [ 'primary', 'secondary', 'success', 'info', 'warning', 'danger' ];
const SIZES = [ 'xs', 'sm', 'md', 'lg', 'xl' ];
const VARIANTS = [ 'text', 'contained', 'outlined' ];

/**
 *
 * @param {ButtonProps} props
 * @returns {JSX}
 */
export default function Button ({
  href,
  component: Component = href ? 'a' : 'button',
  disabled,
  variant = 'text',
  color = 'primary',
  size = 'md',
  icon,
  circle,
  disableRipple = true,
  fullWidth,
  className,
  children,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix,
    !disableRipple && 'ripple',
    icon && `${CssPrefix}--icon`,
    circle && `${CssPrefix}--circle`,
    fullWidth && `${CssPrefix}--full-width`,
    variant && `${CssPrefix}--${variant}`,
    size && `${CssPrefix}--size-${size}`,
    color && `${CssPrefix}--color-${color}`
  );

  return (
    <Component
      {...props}
      href={href}
      disabled={disabled}
      className={classes}
    >{children}
    </Component>
  );
}

Button.COLORS = COLORS;
Button.SIZES = SIZES;
Button.VARIANTS = VARIANTS;
