import { Fragment, RawHtml, Priority } from 'essex';

export default function HtmlPage ({
  lang = 'en',
  title,
  className,
  canonical = 'https://gdb.fyi/',
  children,
  head,
}) {
  const { BUILD_HASH, metadata, intl } = this;
  return (
    <Fragment>
      <RawHtml>{'<!DOCTYPE html>'}</RawHtml>
      <html lang={lang}>
        <head {...{ [Priority]: -1 }}>
          <meta http-equiv="content-type" content="text/html; charset=utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta property="og:site_name" content={intl.formatMessage({ id: 'SITE_TITLE', defaultMessage: 'The Gender Dysphoria Bible' })} />
          {metadata.title && <meta property="og:title" content={metadata.title} />}
          {metadata.description && <meta property="og:description" content={metadata.description} />}
          {metadata.image && <meta property="og:image" content={metadata.image} />}
          <meta property="og:url" content={canonical} />
          <link rel="canonical" href={canonical} />
          <meta name="fediverse:creator" content="twipped@twipped.social" />
          <title>{title}</title>

          {/* <!-- generics --> */}
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="icon" type="image/png"    href="/favicon32.png" sizes="32x32" />
          <link rel="icon" type="image/png"    href="/favicon57.png" sizes="57x57" />
          <link rel="icon" type="image/png"    href="/favicon76.png" sizes="76x76" />
          <link rel="icon" type="image/png"    href="/favicon96.png" sizes="96x96" />
          <link rel="icon" type="image/png"    href="/favicon128.png" sizes="128x128" />
          <link rel="icon" type="image/png"    href="/favicon192.png" sizes="192x192" />
          <link rel="icon" type="image/png"    href="/favicon228.png" sizes="228x228" />

          {/* <!-- Android --> */}
          <link rel="shortcut icon" sizes="196x196" href="/favicon196.png" />

          {/* <!-- iOS --> */}
          <link rel="apple-touch-icon"             type="image/png" sizes="120x120" href="/favicon120.png" />
          <link rel="apple-touch-icon"             type="image/png" sizes="152x152" href="/favicon152.png" />
          <link rel="apple-touch-icon"             type="image/png" sizes="180x180" href="/favicon180.png" />
          <link rel="apple-touch-icon-precomposed" type="image/png" sizes="57x57"   href="/favicon57.png" />
          <link rel="apple-touch-icon-precomposed" type="image/png" sizes="72x72"   href="/favicon72.png" />
          <link rel="apple-touch-icon-precomposed" type="image/png" sizes="120x120" href="/favicon120.png" />
          <link rel="apple-touch-icon-precomposed" type="image/png" sizes="144x144" href="/favicon144.png" />

          <link rel="preconnect" href="//fonts.gstatic.com/" crossorigin />
          <link rel="preconnect" href="//fonts.googleapis.com" />
          <link href="//fonts.googleapis.com/css?family=Sriracha:400" rel="stylesheet" />
          <link href="//fonts.googleapis.com/css?family=Lato:100,200,300,400,700,800" rel="stylesheet" />
          <link href="//fonts.googleapis.com/css?family=Roboto:300,400,600" rel="stylesheet" />
          <link href="//fonts.googleapis.com/css?family=Inter:300,400,600" rel="stylesheet" />
          <link href="//fonts.googleapis.com/css?family=Gothic+A1:300,400,600" rel="stylesheet" />
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
