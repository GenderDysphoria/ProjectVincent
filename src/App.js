import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';

import ThemeProvider from './theme';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import ErrorBoundary from '#src/components/ErrorBoundary';
import Loading from '#src/components/Loading';
import ErrorPage from '#src/components/Error';
import Routing from '#src/routing';
import Quote from '#src/components/Quote';
import { H1, H2, H3, H4, H5 } from '#src/components/Text';

const emotionCache = createCache({
  key: 'gdb',
});

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  blockquote: Quote,
};

const App = () => (
  <Router>
    <CacheProvider value={emotionCache}>
      <ThemeProvider>
        <ErrorBoundary fallback={<ErrorPage />}>
          <MDXProvider components={components}>
            <Suspense fallback={<Loading />}>
              <Routing />
            </Suspense>
          </MDXProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </CacheProvider>
  </Router>
);
App.displayName = 'App';

export default App;
