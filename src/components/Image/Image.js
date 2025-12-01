import clsx from 'clsx';

import { computeSrc } from './images.js';

const CssPrefix = 'ui-image';
export default async function Image ({
  href,
  titlecard,
  src,
  srcSizes,
  className,
  external,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix,
    titlecard && `${CssPrefix}--titlecard`
  );

  const [ files, promises ] = await computeSrc(src);
  await Promise.all(promises);

  const full = files.pop();

  const sizes = [];
  const srcsets = [];

  for (const { url, width } of files) {
    sizes.push(`(max-width: ${width}px) ${width}px`);
    srcsets.push(`${url} ${width}px`);
  }
  sizes.push(`${full.width}px`);
  srcsets.push(`${full.url} ${full.width}px`);

  const img = (
    <img
      sizes={sizes.join(', ')}
      srcSet={srcsets.join(', ')}
      src={full.url}
      {...props}
      className={classes}
    />
  );

  if (href) {
    const linkprops = { href };
    if (external) {
      linkprops.target = '_blank';
      linkprops.rel = 'noopener';
    }
    return <a href={href}>{img}</a>;
  }

  return img;
}
