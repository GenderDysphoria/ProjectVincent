import { groupBy } from '@twipped/utils';
import clsx from 'clsx';

import Image from '#src/components/Image';
import { computeSrc } from '#src/components/Image/images';

const CssPrefix = 'tweet';
export default function Tweet ({
  component: Component = 'div',
  id,
  href,
  username,
  displayName,
  avatar,
  date,
  className,
  children,
  ...props
}) {
  const classes = clsx(
    className,
    CssPrefix
  );

  const media = [];
  const body = [];

  if (children && !Array.isArray(children)) {
    children = [ children ];
  }

  if (!children) {
    console.log('Tweet without tweet', id);
    return null;
  }
  for (const c of children) {
    if (c.type === TweetBody) {
      body.push(c);
    }
    if (c.type === TweetMedia) {
      media.push(c);
    }
  }

  return (
    <Component {...props} className={classes}>
      <a className="tweet-header" href="https://twitter.com/{{user.screen_name}}" target="_blank" rel="noreferrer">
        <b><Image src={avatar} alt="" /></b>
        <strong>
          {displayName}
        </strong>
        <span>@{username}</span>
        <Image src="/twitter/logo.svg" alt="Twitter Logo" className="tweet-logo" />
      </a>
      {body}
      {media.length && (
        <div className={[ 'tweet-entities', 'lightbox', `entity-count-${media.length}`, `entity-type-${media[0].type}` ]}>
          {media}
        </div>
      )}
    </Component>
  );
}

export function TweetBody ({
  children,
}) {
  return (
    <div className="tweet-text">{children}</div>
  );
}

export async function TweetMedia ({
  type,
  src,
  poster,
  alt,
  children,
}) {
  if (type === 'image') {
    const [ files, promises ] = await computeSrc(src);
    const thumb = files.at(0);
    const full = files.at(-1);

    await Promise.all(promises);

    return (
      <div className="tweet-entity">
        <a className="tweet-photo lb" style={{ backgroundImage: `url(${thumb.url})` }} href={full.url}>
          <img src={full.url} alt={alt} />
        </a>
      </div>
    );
  }

  if (type === 'video') {
    let full;

    if (poster) {
      const [ files, promises ] = await computeSrc(poster, { noShrink: true });
      full = files.at(-1).url;

      await Promise.all(promises);
    }

    return (
      <video controls poster={full} className="tweet-video">
        {children}
      </video>
    );
  }

  if (type === 'animated_gif') {
    let full;

    if (poster) {
      const [ files, promises ] = await computeSrc(poster, { noShrink: true });
      full = files.at(-1).url;

      await Promise.all(promises);
    }

    return (
      <video controls autoplay muted loop poster={full} className="tweet-video">
        {children}
      </video>
    );
  }

  return (
    null
  );
}

Tweet.Body = TweetBody;
Tweet.Media = TweetMedia;
