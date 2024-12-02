import clsx from 'clsx';

const CssPrefix = 'ui-image';
export default function Image ({
  href,
  titlecard,
  srcSizes,
  className,
  external,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix
  );

  const img = <img sizes={srcSizes} {...props} className={classes} />;

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
