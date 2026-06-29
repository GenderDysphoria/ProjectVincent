import { isValid, intlFormat } from 'date-fns';

import Image from '#src/components/Image';
import { computeSrc } from '#src/components/Image/images';

export default async function InstagramEmbed ({
  href,
  avatar,
  username,
  displayName,
  src,
  alt,
  date,
  children,
}) {
  let utc;
  date = date ? new Date(date) : null;
  if (!isValid(date)) date = null;
  if (date) {
    utc = date.toUTCString();
    date = [
      intlFormat(date, {
        timeStyle: 'short',
      }),
      intlFormat(date, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    ].join(' - ');
  }

  const [ [ avatarIcon ], promises ] = await computeSrc(avatar);
  await Promise.all(promises);

  return (
    <a class="card ig-card">
      <div class="ig-header">
        <div class="ig-avatar" style={{ backgroundImage: `url(${avatarIcon.url})` }} />
        <div class="ig-name">
          <strong>{displayName}</strong>
          <span>{username}</span>
        </div>
        <svg class="ig-logo" viewBox="0 0 24 24">
          <path d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12ZM17.5 8C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5C16 7.32843 16.6716 8 17.5 8Z" fill="currentColor" />
        </svg>
      </div>

      <Image
        src={src}
        alt={alt}
        className="ig-image"
      />
      <p class="ig-caption">
        {children}
      </p>
      <p class="ig-footer">
        <time class="tweet-date" datetime={utc} title={utc}>{date}</time>
      </p>
    </a>
  );
}
