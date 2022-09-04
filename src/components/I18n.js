import PropTypes from 'prop-types';
import { useMemo } from 'react';
// eslint-plugin-import has a bug in resolving across symlinks, such as in a monorepo.
/* eslint-disable import/no-unresolved */
import warn from '@zenbusiness/application-commons-utils/warn';
/* eslint-enable import/no-unresolved */
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import template from 'lodash/template';

export * from 'react-intl';

/**
 * Async function to retrieve an i18n json file.
 *
 * @param   {string} url
 *
 * @returns {Object}
 * @private
 */
async function fetchMessages (url) {
  // const url = `${DEFAULT_SEGMENT}/static/intl/${locale}.json?revision=${RELEASE_VERSION}`;
  try {
    const res = await window.fetch(url, { cache: 'force-cache' });
    const body = await res.json();
    return body;
  } catch (e) {
    warn(e);
  }
  return {};
}

const cache = new Map();

/**
 * Internationalization Messages Provider
 * Wraps react-intl's provider to automatically fetch the current locale
 * messages and make them available.
 *
 * @param {Object} props
 * @param {string} props.locale Defaults to the browser's language selection
 * @param {string|Function} props.findPath Function or lodash string to produce a local path to
 * an i18n strings json file.
 *
 * @returns {Element}
 * @component
 */
export default function IntlProvider ({
  locale = String(window.navigator.language),
  findPath,
  ...props
}) {
  // memoize compiling any template string
  const getUrl = useMemo(() => {
    if (typeof findPath === 'function') {
      return findPath;
    }
    if (typeof findPath === 'string') {
      return template(findPath);
    }

    throw new TypeError('The "findPath" property must be either a function or a lodash template string.');
  }, [ findPath ]);

  // memoize the url based on locale
  const url = useMemo(() => getUrl({ locale }), [ getUrl, locale ]);

  // see if the cache has that url
  const current = cache.get(url);

  // no cache set, create a fetch promise, store it in the cache, and throw to suspense
  if (!current) {
    const p = fetchMessages(url).then((m) => {
      cache.set(url, m);
    });
    cache.set(url, p);
    throw p;
  }

  // if the cached value is a thennable, throw it so suspense receives it
  if (current?.then) throw current;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ReactIntlProvider locale={locale} messages={current} {...props} />
  );
}

IntlProvider.propTypes = {
  locale: PropTypes.string,
  findPath: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,
};

// overwrite the same export from react-intl.
export { IntlProvider };
