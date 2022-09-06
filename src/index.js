import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const element = document.getElementById('root');
const root = createRoot(element);
root.render(createElement(App));

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
