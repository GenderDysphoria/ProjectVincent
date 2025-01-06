import clsx from 'clsx';
import { cloneElement } from 'essex';

const CssPrefix = 'ui-stack';
export default function Stack ({
  component: Component = 'div',
  spacing = 0,
  direction,
  justify,
  center,
  align = 'start',
  className,
  style,
  divider,
  children,
  ...props
}) {
  if (center) {
    justify = 'center';
    align = 'center';
  }
  const classes = clsx(
    className,
    CssPrefix,
    direction && `${CssPrefix}--direction-${direction}`,
    justify && `${CssPrefix}--justify-${justify}`,
    align && `${CssPrefix}--align-${align}`
  );
  if (spacing && typeof spacing === 'number') {
    spacing = `calc(var(--spacing) * ${spacing})`;
  }
  style = spacing
    ? {
        ...style,
        '--stack-gap': spacing,
      }
    : style;

  if (divider) {
    if (!Array.isArray(children)) {
      throw new Error('Stack cannot insert dividers for non-array children');
    }
    if (children.length) {
      children = joinChildren(children, divider);
    }
  }

  return <Component {...props} style={style} className={classes}>{children}</Component>;
}

function joinChildren (children, separator) {
  return children.reduce((output, child, index) => {
    output.push(child);

    if (index < children.length - 1) {
      output.push(cloneElement(separator));
    }

    return output;
  }, []);
}
