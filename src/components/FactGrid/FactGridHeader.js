import clsx from 'clsx';

import Text from '#src/components/Text';

const CssPrefix = 'fact-grid-header';
export default function FactGrid ({
  component = 'h4',
  weight = 'bold',
  size = 'md',
  className,
  children,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix
  );

  return (
    <Text
      component={component}
      weight={weight}
      size={size}
      {...props}
      className={classes}
    >
      {children}
    </Text>
  );
}
