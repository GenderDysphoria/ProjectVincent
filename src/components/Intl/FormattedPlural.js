import { Fragment, jsx } from 'essex';

export default function FormattedPlural ({
  as = Fragment,
  value,
  other,
  children,
  ...rest
}) {
  const { formatPlural } = this.intl;
  const formattedPlural = rest[formatPlural(value, rest)] || other;
  if (typeof children === 'function') return children(formattedPlural);
  return jsx(as, { children: formattedPlural });
}
