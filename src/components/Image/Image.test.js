import fest, { test, expect, describe, afterEach, beforeEach, beforeAll } from '@twipped/festival';
import { render } from 'essex';

import Image from './Image.js';

describe('#src/components/Image', () => {
  test('hands', async () => {
    const testCase = (
      <Image src="/en/images/hands.jpeg" alt="hands" />
    );
    const warn = fest.fn();

    const output = await render(testCase, { warn });
    expect(output).toEqual('<img sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1366px) 1366px, (max-width: 1920px) 1920px, 3909px" srcset="/en/images/hands_640w_baef986f.jpeg 640px, /en/images/hands_768w_baef986f.jpeg 768px, /en/images/hands_1366w_baef986f.jpeg 1366px, /en/images/hands_1920w_baef986f.jpeg 1920px, /en/images/hands_baef986f.jpeg 3909px" src="/en/images/hands_baef986f.jpeg" alt="hands" class="ui-image">');
  });

  test('theredgrrl', async () => {
    const testCase = (
      <Image src="/en/images/theredgrrl.jpg" alt="theredgrrl" />
    );
    const warn = fest.fn();

    const output = await render(testCase, { warn });
    expect(output).toEqual('<img sizes="150px" srcset="/en/images/theredgrrl_a1dec108.jpg 150px" src="/en/images/theredgrrl_a1dec108.jpg" alt="theredgrrl" class="ui-image">');
  });
});
