/* eslint-disable no-param-reassign */
import { styled } from 'essex-emotion';

const FlexColumn = styled('div', {
  label: 'FlexColumn',
  doNotForward: [
    'justify',
    'align',
    'scrollable',
    'wrap',
    'center',
  ],
})(
  ({
    wrap, justify = 'stretch', align = 'center', center, scrollable,
  }) => ({
    display: 'flex',
    alignSelf: 'stretch',

    flexFlow: `column ${wrap ? 'wrap' : 'nowrap'}`,

    justifyContent: center ? 'center' : {
      top: 'flex-start',
      bottom: 'flex-end',
    }[align] || align,

    alignItems: center ? 'center' : {
      right: 'flex-end',
      left: 'flex-start',
      around: 'space-around',
      between: 'space-between',
    }[justify] || justify,

    ...(scrollable && {
      overflowX: 'hidden',
      overflowY: 'auto',
    }),
  })
);

FlexColumn.displayName = 'FlexColumn';

export default FlexColumn;
