import { RawHtml } from 'essex';

import EnglishIntro, { meta as eMeta } from './en/index.mdx';

export const meta = {
  title: eMeta.title,
  description: eMeta.description,
  url: '/',
};

export default function SiteLanding () {
  return (
    <>
      <RawHtml>{'<meta http-equiv="refresh" content="0; URL=\'/en/\'" />'}</RawHtml>
      <EnglishIntro />
    </>
  );
}
