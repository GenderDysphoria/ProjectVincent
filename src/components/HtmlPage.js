import { Fragment, RawHtml, Priority } from 'essex';

export default function HtmlPage ({
  lang = 'en',
  title,
  className,
  canonical = 'https://gdb.fyi/',
  children,
  head,
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
          <link href="//fonts.googleapis.com/css2?family=Gothic+A1&family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Sriracha&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href={`/static/${BUILD_HASH}/bundle.css`} type="text/css" />
          {head}
        </head>
        <body className={className}>
          {children}
        </body>
      </html>
    </Fragment>
  );
}
