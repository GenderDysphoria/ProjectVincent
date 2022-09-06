export default function (languages) {
  return `
import { Routes, Route } from 'react-router-dom';

${Object.values(languages).map(makeImport).join('\n')}

export default function Languages () {
  return (
    <Routes>
${Object.values(languages).map(makeRoute).join('\n')}
    </Routes>
  )
}
`;
}

function makeImport ({ lang }) {
  return `import Lang${lang.toUpperCase()} from '#compiled/lang/${lang}/index.js';`;
}

function makeRoute ({ lang }) {
  return `      <Route path="/${lang}/*" element={<Lang${lang.toUpperCase()} />} />`;
}
