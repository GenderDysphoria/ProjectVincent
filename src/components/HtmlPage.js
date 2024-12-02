import { Fragment, RawHtml, Priority } from 'essex';

export default function HtmlPage ({
  lang = 'en',
  title,
  className,
  canonical = 'https://gdb.fyi/',
  children,
}) {
  const { BUILD_HASH, metadata } = this;
  return (
    <Fragment>
      <RawHtml>{'<!DOCTYPE html>'}</RawHtml>
      <html lang={lang}>
        <head {...{ [Priority]: -1 }}>
          <meta http-equiv="content-type" content="text/html; charset=utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta property="og:site_name" content="Amorra" />
          {metadata.title && <meta property="og:title" content={metadata.title} />}
          {metadata.description && <meta property="og:description" content={metadata.description} />}
          {metadata.image && <meta property="og:image" content={metadata.image} />}
          <meta property="og:url" content={canonical} />
          <link rel="canonical" href={canonical} />
          <title>{title}</title>

          <link rel="preconnect" href="//fonts.gstatic.com/" crossorigin />
          <link rel="preconnect" href="//fonts.googleapis.com" />
          <link rel="stylesheet" href={`/static/${BUILD_HASH}/bundle.css`} type="text/css" />
        </head>
        <body className={className}>
          {children}
        </body>
      </html>
    </Fragment>
  );
}
