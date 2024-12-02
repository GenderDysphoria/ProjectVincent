import clsx from 'clsx';

const CssPrefix = 'ui-divider';
export default function Divider ({
  light,
  orientation = 'horizontal',
  component: Component = orientation === 'vertical' ? 'div' : 'hr',
  role = Component !== 'hr' ? 'separator' : undefined,
  variant = 'full',
  flexItem,
  className,
  children,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix,
    orientation && `${CssPrefix}--${orientation}`,
    variant && `${CssPrefix}--v-${variant}`,
    light && `${CssPrefix}--light`,
    flexItem && `${CssPrefix}--flex-item`
  );

  return (
    <Component
      {...props}
      role={role}
      className={classes}
      aria-orientation={
        role === 'separator' && (Component !== 'hr' || orientation === 'vertical')
          ? orientation
          : undefined
      }
    >
      <span className={`${CssPrefix}-wrapper`}>
        {children}
      </span>
    </Component>
  );
}
