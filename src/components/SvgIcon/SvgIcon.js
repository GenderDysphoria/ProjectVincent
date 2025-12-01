import clsx from 'clsx';

/**
 * @typedef SvgIconProps
 * @property {string} [component]
 * @property {'text'|'contained'|'outlined'} [variant]
 * @property {'sm'|'md'|'lg'} [size]
 * @property {'primary'|'secondary'|'success'|'info'|'warning'|'danger'} [color]
 * @property {boolean} [disabled]
 * @property {boolean} [action]
 */

const CssPrefix = 'ui-svg-icon';

/**
 *
 * @param {SvgIconProps} props
 * @returns {JSX}
 */
export default function SvgIcon ({
  className,
  children,
  disabled,
  action,
  size,
  color,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix,
    disabled && `${CssPrefix}--disabled`,
    action && `${CssPrefix}--action`,
    size && `${CssPrefix}--size-${size}`
  );

  return (
    <svg className={classes} role="img" {...props}>
      {children}
    </svg>
  );
}
