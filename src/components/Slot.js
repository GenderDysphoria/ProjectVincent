import clsx from 'clsx';
import { cloneElement, Element } from 'essex';

export default function Slot ({
  component: Component = 'slot',
  className,
  props,
  children,
  ...rest
}) {
  const classes = clsx(
    className,
    props?.className
  );

  if (Component instanceof Element) {
    return cloneElement(Component, { ...props, ...rest, className: classes, children });
  }

  return (
    <Component {...props} {...rest} className={classes}>{children}</Component>
  );
}
