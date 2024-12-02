import clsx from 'clsx';

const MEDIA_COMPONENTS = [ 'video', 'audio', 'picture', 'iframe', 'img' ];
const IMAGE_COMPONENTS = [ 'picture', 'img' ];

const CssPrefix = 'ui-card-media';
export default function CardMedia ({
  component: Component = 'div',
  className,
  image,
  src,
  children,
  style,
  ...props
}) {
  const isMediaComponent = MEDIA_COMPONENTS.includes(Component);
  const isImageComponent = IMAGE_COMPONENTS.includes(Component);

  style = !isMediaComponent && image
    ? { backgroundImage: `url("${image}")`, ...style }
    : style;

  const classes = clsx(
    className,
    CssPrefix,
    isMediaComponent && `${CssPrefix}--media`,
    isImageComponent && `${CssPrefix}--image`
  );

  return (
    <Component
      {...props}
      className={classes}
      style={style}
      role={!isMediaComponent && image ? 'img' : undefined}
      src={isMediaComponent ? image || src : undefined}
    >
      {children}
    </Component>
  );
}
