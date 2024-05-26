import { Priority } from 'essex';

export default function PageRoot ({ children }) {
  return (
    <>
      <html lang="{{page.lang}}">
        <head {...{ [Priority]: -1 }}>
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="UTF-8" />
          <meta name="referrer" content="origin-when-cross-origin" />
          <meta name="author" content="{{site.author}}" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta property="og:site_name" content="{{{lang 'SITE_TITLE'}}}" />
          <meta name="twitter:site" content="{{{lang 'SITE_TITLE'}}}" />
          <meta name="twitter:creator" content="{{site.creator}}" />
        </head>
        <body>
          {children}
        </body>
      </html>
    </>
  );
}
