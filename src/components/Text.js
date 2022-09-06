import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { css } from '@emotion/react';
import { rgba } from 'emotion-rgba';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import cl from '@twipped/utils/cl';

export const VARIANTS = [
  'monospace',
  'wrap',
  'nowrap',
  'truncate',
  'code',
  'centered',
  'lowercase',
  'uppercase',
  'capitalize',
  'fifty',
  'muted',
  'disabled',
  'error',
  'info',
  'primary',
  'secondary',
  'small',
  'large',
  'extra-light',
  'light',
  'normal',
  'bold',
  'extra-bold',
  'italic',
  'strong',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
];

const VNAMES = new Set(VARIANTS);


const TextRoot = styled(Typography)(({ theme }) => css`
  &.Text-monospace { ${theme.typography.fontFamilyMonospace} !important; }

  &.Text-wrap     { white-space: normal !important; }
  &.Text-nowrap   { white-space: nowrap !important; }
  &.Text-truncate {
    ${theme.typography.truncate};
  }
  &.Text-code {
    ${theme.typography.code};
  }

  &.Text-centered {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &.Text-lowercase  { text-transform: lowercase !important; }
  &.Text-uppercase  { text-transform: uppercase !important; }
  &.Text-capitalize { text-transform: capitalize !important; }

  &.Text-fifty     { color: ${rgba(theme.palette.text.primary, 0.5)} !important; }
  &.Text-muted     { color: ${theme.palette.text.secondary} !important; }
  &.Text-disabled  { color: ${theme.palette.text.disabled} !important; }
  &.Text-error     { color: ${theme.palette.danger.main} !important; }
  &.Text-info      { color: ${theme.palette.info.main} !important; }
  &.Text-primary   { color: ${theme.palette.primary.main} !important; }
  &.Text-secondary { color: ${theme.palette.secondary.main} !important; }

  &.Text-small   { ${theme.typography.small}; }
  &.Text-large   { ${theme.typography.large}; }

  &.Text-extra-light { font-weight: ${theme.typography.fontWeightExtraLight} !important; }
  &.Text-light       { font-weight: ${theme.typography.fontWeightLight} !important; }
  &.Text-normal      { font-weight: ${theme.typography.regular} !important; }
  &.Text-bold        { font-weight: ${theme.typography.fontWeightBold} !important; }
  &.Text-extra-bold  { font-weight: ${theme.typography.fontWeightExtraBold} !important; }

  &.Text-italic  { font-style: italic !important; }
  &.Text-strong  { font-weight: ${theme.typography.fontWeightBold} !important; }
`);

function parseVariant (input) {
  if (typeof input === 'string') return `Text-${input}`;
  if (Array.isArray(input)) return input.flat(Infinity).map(parseVariant);
  return null;
}

const Text = forwardRef(({
  className,
  children,
  variant,
  as = Typography,
  ...props
}, ref) => {
  const remaining = {};
  const variants = [ variant ];
  for (const [ k, v ] of Object.entries(props)) {
    if (VNAMES.has(k)) {
      if (v) variants.push(k);
    } else {
      remaining[k] = v;
    }
  }

  return (
    <TextRoot
      {...remaining}
      as={as}
      ref={ref}
      className={cl(
        className,
        parseVariant(variants)
      )}
    >{children}</TextRoot>
  );
});
Text.displayName = 'Text';

const variantProp = PropTypes.oneOf(VARIANTS);
Text.propTypes = {
  variant: PropTypes.oneOfType([
    variantProp,
    PropTypes.arrayOf(variantProp),
  ]),

  /**
   * The underlying HTML element to use when rendering the text.
   */
  as: PropTypes.elementType,
};

export default Text;

function make (v, name, props = {}) {
  const C = forwardRef(({ variant, ...p }, ref) => (
    <Text
      {...props}
      {...p}
      ref={ref}
      variant={[ v, variant ]}
    />
  ));
  if (name) C.displayName = name;
  C.propTypes = Text.propTypes;
  return C;
}

export const Muted = /* #__PURE__*/make('muted', 'TextMuted');
export const Small = /* #__PURE__*/make('small', 'TextSmall', { as: 'small' });
export const Monospace = /* #__PURE__*/make('monospace',  'Monospace');
export const Strong =    /* #__PURE__*/make('bold',  'Strong', { as: 'strong' });
export const ErrorText = /* #__PURE__*/make('error', 'ErrorText');
export const Code =      /* #__PURE__*/make('code',  'Code');
export const H1 =        /* #__PURE__*/make('h1',    'H1', { as: 'h1' });
export const H2 =        /* #__PURE__*/make('h2',    'H2', { as: 'h2' });
export const H3 =        /* #__PURE__*/make('h3',    'H3', { as: 'h3' });
export const H4 =        /* #__PURE__*/make('h4',    'H4', { as: 'h4' });
export const H5 =        /* #__PURE__*/make('h5',    'H5', { as: 'h5' });
export const H6 =        /* #__PURE__*/make('h6',    'H6', { as: 'h6' });

