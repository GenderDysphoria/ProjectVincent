/* eslint-disable no-param-reassign */
import { styled } from 'essex-emotion';

const FlexRow = styled('div', {
  label: 'FlexRow',
  doNotForward: [
    'justify',
    'align',
    'scrollable',
    'wrap',
    'center',
  ],
})(
  ({
    wrap, justify = 'stretch', align = 'center', center,
  }) => ({
    display: 'flex',

    flexFlow: `row ${wrap ? 'wrap' : 'nowrap'}`,

    alignItems: center ? 'center' : {
      top: 'flex-start',
      bottom: 'flex-end',
    }[align] || align,

    justifyContent: center ? 'center' : {
      right: 'flex-end',
      left: 'flex-start',
      around: 'space-around',
      between: 'space-between',
    }[justify] || justify,
  })
);

FlexRow.displayName = 'FlexRow';

export default FlexRow;
