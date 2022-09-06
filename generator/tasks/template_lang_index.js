export default function ({ lang, name, pages, messages }) {
  const index = pages[0];
  const trimLen = `/${lang}/`.length;

  function makeRow (p, i) {
    if (!i) return `  "/": Index,`;

    return `  "${p.slice(trimLen)}": lazy(() => import('#public${p}.mdx')),`;
  }

  return `
import { Lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '#public${index}index.mdx';
import Chrome from '#src/Chrome';

const messages = ${JSON.stringify(messages, null, 2)};

const routes = {
${pages.map(makeRow).join('\n')}
}

export default function lang${lang.toUpperCase()} () {
  return (
    <IntlProvider messages={messages} locale="${lang}">
      <Routes>
        <Route path="/${lang}" element={<Chrome />}>
          {Object.entries(routes).map(([ path, Element ]) => (
            <Route path={path} element={<Element />} />
          ))}
        </Route>
      </Routes>
    </IntlProvider>
  )
}
lang${lang.toUpperCase()}.displayName = "${name}";
`;
}
