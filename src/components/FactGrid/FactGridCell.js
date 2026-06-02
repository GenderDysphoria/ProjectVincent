import clsx from 'clsx';

const CssPrefix = 'fact-grid-cell';
export default function FactGridCell ({
  component: Component = 'div',
  className,
  children,
  twoColumn,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix,
    twoColumn && `${CssPrefix}--two-col`
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
