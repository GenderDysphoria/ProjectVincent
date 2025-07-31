// import styled from '@emotion/styled';

export default function Tweet ({
  children,
}) {
  return (
    <span>Tweet goes here: {children}</span>
  );
}

export function TweetBody ({
  children,
}) {
  return (
    <span>Tweet goes here: {children}</span>
  );
}

export function TweetMedia ({
  children,
}) {
  return null;
}

Tweet.Body = TweetBody;
Tweet.Media = TweetMedia;
