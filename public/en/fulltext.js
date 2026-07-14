import { headingComponents } from '#src/components/Text/Text';

import Introduction from './index.mdx';

const pages = (await Promise.all([
  import('./what-is-gender.mdx'),
  import('./history.mdx'),
  import('./euphoria.mdx'),
  import('./physical-dysphoria.mdx'),
  import('./biochemical-dysphoria.mdx'),
  import('./social-dysphoria.mdx'),
  import('./societal-dysphoria.mdx'),
  import('./sexual-dysphoria.mdx'),
  import('./presentational-dysphoria.mdx'),
  import('./existential-dysphoria.mdx'),
  import('./managed-dysphoria.mdx'),
  import('./impostor-syndrome.mdx'),
  import('./am-i-trans.mdx'),
  import('./diagnoses.mdx'),
  import('./treatment.mdx'),
  import('./causes.mdx'),
  import('./chromosomes.mdx'),
  import('./hormones.mdx'),
  import('./second-puberty-masc.mdx'),
  import('./second-puberty-fem.mdx'),
  import('./conclusion.mdx'),
])).map(({ default: Page }) => <Page components={headingComponents} />);

export const meta = {
  key: 'fulltext',
  title: 'The Gender Dysphoria Bible',
  description: 'A dive into the multitude of ways that gender dysphoria manifests and what it means to be transgender.',
  url: '/en/fulltext',
};

export default function Fulltext () {
  return (
    <div className="fulltext no-disclaimer">
      <Introduction components={headingComponents} />
      {pages}
    </div>
  );
}
