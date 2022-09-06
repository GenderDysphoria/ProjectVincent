import { Routes, Route, useNavigate } from 'react-router-dom';
import Languages from '#compiled/lang';
import manifest from '#compiled/manifest.json';

export default function Routing () {
  return (
    <Routes>
      <Route path="/" element={<LangRedirect />} />
      <Route path="/*" element={<Languages />} />
    </Routes>
  );
}

function LangRedirect () {
  const navigate = useNavigate();
  const lang = (() => {
    const long = window.navigator.language;
    const short = long.slice(0, 2);

    if (manifest.languages[long]) {
      return long;
    }
    if (manifest.languages[short]) {
      return short;
    }
    return 'en';
  })();

  navigate(`/${lang}/`);
}
