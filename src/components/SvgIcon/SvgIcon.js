import clsx from 'clsx';

const CssPrefix = 'ui-svg-icon';
export default function SvgIcon ({
  className,
  children,
  disabled,
  action,
  fontSize,
  color,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix,
    disabled && `${CssPrefix}--disabled`,
    action && `${CssPrefix}--action`,
    fontSize && `${CssPrefix}--${fontSize}`
  );

  return (
    <svg className={classes} role="img" {...props}>
      {children}
    </svg>
  );
}
