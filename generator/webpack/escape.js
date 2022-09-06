/**
 * Processes the passed object into a collection of `process.env.*` keys
 * suitable for passing to webpack's DefinePlugin or rollup's replace plugin.
 *
 * @function escapeForBundling
 * @param   {Object} input Input
 * @param   {Object} [options] Options
 * @param   {string} [options.prefix] Variable prefix
 * @param   {string} [options.suffix] Variable suffix
 *
 * @returns {Object}
 */
export default function escapeForBundling (input, { prefix = 'process.env.', suffix = '' }) {
  return Object.fromEntries(
    Object.entries(input).map(
      ([ key, value ]) => [ `${prefix}${key}${suffix}`, JSON.stringify(value) ]
    )
  );
}
