import { RawHtml } from 'essex';

import EnglishIntro, { meta } from './en/index.mdx';

export { meta };

export default function SiteLanding () {
  return (
    <>
      <RawHtml>{'<meta http-equiv="refresh" content="0; URL=\'/en/\'" />'}</RawHtml>
      <EnglishIntro />
    </>
  );
}
