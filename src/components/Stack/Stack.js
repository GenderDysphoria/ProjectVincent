import clsx from 'clsx';
import { cloneElement } from 'essex';

import Divider from '#src/components/Divider';

/**
 * @typedef StackProps
 * @property {string|Function} [component]
 * @property {number} [spacing]
 * @property {'column' | 'column-reverse' | 'row' | 'row-reverse'} [direction]
 * @property {'start'|'center'|'end'|'between'|'around'|'stretch'} [justify]
 * @property {'start'|'center'|'end'|'stretch'} [align]
 * @property {boolean} [center]
 * @property {string} [className]
 * @property {boolean} [divider]
 */

const CssPrefix = 'ui-stack';

/**
 *
 * @param {StackProps} props
 * @returns {JSX}
 */
export default function Stack ({
  component: Component = 'div',
  spacing = 0,
  direction,
  justify,
  align = 'start',
  center,
  wrap,
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
    wrap && `${CssPrefix}--wrap`,
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
    if (divider === true) {
      divider = <Divider orientation="vertical" />;
    }
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
