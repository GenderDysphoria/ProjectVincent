import clsx from 'clsx';

import SvgIcon from '#src/components/SvgIcon';

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

/**
 *
 * @param {TextProps} props
 * @returns {JSX}
 */
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

function getAnchor (text) {
  if (typeof text !== 'string') return null;
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-');
}

function createHeading (component) {
  const Heading = (props) => {
    const anchor = getAnchor(props.children);
    const link = `#${anchor}`;
    return (
      <h2 id={anchor}>
        {props.children}
        <a href={link} className="header-link">
          <SvgIcon icon="paragraph" />
        </a>
      </h2>
    );
  };
  Heading.displayName = component.toUpperCase();
  return Heading;
}

export const H1 = createHeading('h1');
export const H2 = createHeading('h2');
export const H3 = createHeading('h3');
export const H4 = createHeading('h4');
export const H5 = createHeading('h5');
export const H6 = createHeading('h6');
export const headingComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
};
