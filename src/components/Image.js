import { styled } from 'essex-emotion';

const ImageBase = styled('img', {

})(() => ({
  maxWidth: '100%',
}));

export default function Image ({
  href,
  titlecard,
  srcSizes,
  ...props
}) {
  if (titlecard) {
    this.metadata.apply({ titlecard: props.src });
  }

  const img = <ImageBase sizes={srcSizes} {...props} />;

  if (href) {
    return <a href={href}>{img}</a>;
  }

  return img;
}
