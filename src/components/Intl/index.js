import { Fragment, jsx } from 'essex';

var DisplayName = {
  formatDate: 'FormattedDate',
  formatTime: 'FormattedTime',
  formatNumber: 'FormattedNumber',
  formatList: 'FormattedList',
  formatDisplayName: 'FormattedDisplayName',
};

function createFormattedComponent (name) {
  const Component = ({
    as = Fragment,
    value,
    children,
    ...formatProps
  }) => {
    const { intl } = this;
    if (!intl) throw new Error('intl object not in page scope');
    const formattedValue = intl[name](value, formatProps);
    if (typeof children === 'function') return children(formattedValue);
    return /* @__PURE__ */ jsx(as, { children: formattedValue });
  };
  Component.displayName = DisplayName[name];
  return Component;
}

export const FormattedDate = createFormattedComponent('formatDate');
export const FormattedTime = createFormattedComponent('formatTime');
export const FormattedNumber = createFormattedComponent('formatNumber');
export const FormattedList = createFormattedComponent('formatList');
export const FormattedDisplayName = createFormattedComponent('formatDisplayName');
export { default as FormattedMessage } from './FormattedMessage.js';
export { default as FormattedPlural } from './FormattedPlural.js';
