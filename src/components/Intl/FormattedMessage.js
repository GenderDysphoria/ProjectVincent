import { Fragment, jsx } from 'essex';

export default function FormattedMessage ({
  as = Fragment,
  id,
  description,
  defaultMessage,
  values,
  ignoreTag,
  children,
}) {
  if (!this.intl) throw new Error('intl object not in page scope');
  const { formatMessage } = this.intl;

  const descriptor = { id, description, defaultMessage };
  const nodes = formatMessage(descriptor, values, {
    ignoreTag,
  });

  if (typeof children === 'function') return children(Array.isArray(nodes) ? nodes : [ nodes ]);
  return /* @__PURE__ */ jsx(as, { children: nodes });
}
