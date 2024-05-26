import { ucfirst } from '@twipped/utils';
import { styled } from 'essex-emotion';

export const VARIANTS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'muted',
  'code',
  'button',
  'caption',
  'overline',
];

export const SIZES = [
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  'small',
  'large',
];

export const WEIGHTS = [
  'thin',
  'lite',
  'regular',
  'bold',
  'heavy',
];

const Text = styled('span', {
  label: 'FlexColumn',
  doNotForward: [
    'monospace',
    'wrap',
    'nowrap',
    'truncate',
    'lowercase',
    'uppercase',
    'capitalize',
    'italic',
    'disabled',
    'variant',
    'size',
    'weight',
  ],
})(
  ({
    theme,
    monospace,
    wrap,
    nowrap,
    truncate,
    lowercase,
    uppercase,
    capitalize,
    italic,
    disabled,
    variant,
    size,
    weight,
  }) => ({
    ...(monospace && theme.typography.monospace),
    ...(wrap && { whiteSpace: 'normal' }),
    ...(nowrap && { whiteSpace: 'nowrap' }),
    ...(truncate && theme.typography.truncate),
    ...(VARIANTS.includes(variant)
      && theme.typography[variant]
    ),
    ...(SIZES.includes(size)
      && theme.typography[size]
    ),
    ...(WEIGHTS.includes(weight)
      && theme.typography[`weight${ucfirst(weight)}`]
    ),
    ...(lowercase && { textTransform: 'lowercase' }),
    ...(uppercase && { textTransform: 'uppercase' }),
    ...(capitalize && { textTransform: 'capitalize' }),
    ...(italic && { fontStyle: 'italic' }),
    ...(disabled && { color: theme.palette.text.disabled }),
  })
);

export default Text;

Text.H1 = /* #__PURE__*/styled(Text, { props: { variant: 'h1', as: 'h1' } });
Text.H2 = /* #__PURE__*/styled(Text, { props: { variant: 'h2', as: 'h2' } });
Text.H3 = /* #__PURE__*/styled(Text, { props: { variant: 'h3', as: 'h3' } });
Text.H4 = /* #__PURE__*/styled(Text, { props: { variant: 'h4', as: 'h4' } });
Text.H5 = /* #__PURE__*/styled(Text, { props: { variant: 'h5', as: 'h5' } });
Text.H6 = /* #__PURE__*/styled(Text, { props: { variant: 'h6', as: 'h6' } });
