import {
  ENV,
  IS_PROD,
  PATH_SRC,
  BABEL_CONFIG,
} from '../config.js';


export default {
  strictExportPresence: true,
  rules: [
    // Handle node_modules packages that contain sourcemaps
    {
      enforce: 'pre',
      exclude: /@babel(?:\/|\\{1,2})runtime/,
      test: /\.(js|mjs|jsx|ts|tsx|css)$/,
      loader: 'source-map-loader',
    },

    {
      test: /\.m?js$/,
      type: "javascript/auto",
    },
    {
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    },
    {
      test: /\.json$/,
      type: 'asset/source',
    },

    {
      // "oneOf" will traverse all following loaders until one will
      // match the requirements. When no loader matches it will fall
      // back to the "file" loader at the end of the loader list.
      oneOf: [
        // "url" loader works like "file" loader except that it embeds assets
        // smaller than specified limit in bytes as data URLs to avoid requests.
        // A missing `test` is equivalent to a match.
        {
          test: [ /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/ ],
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 10000,
            },
          },
        },

        // Process SVG files into react components
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                prettier: false,
                svgo: false,
                svgoConfig: {
                  plugins: [ { removeViewBox: false } ],
                },
                titleProp: true,
                ref: true,
              },
            },
          ],
          issuer: {
            and: [ /\.(ts|tsx|js|jsx|md|mdx)$/ ],
          },
        },

        {
          test: /\.css$/i,
          use: [
            // The `injectType`  option can be avoided because it is default behaviour
            { loader: "style-loader", options: { injectType: "styleTag" } },
            "css-loader",
          ],
        },

        // Process application JS with Babel.
        {
          test: /\.(js|mjs|jsx|ts|tsx|mjs)$/,
          include: PATH_SRC,
          loader: 'babel-loader',
          options: {
            plugins: [ ENV.USE_REACT_REFRESH && 'react-refresh/babel' ].filter(Boolean),
            ...BABEL_CONFIG,

            babelrc: false,
            compact: IS_PROD,

            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            cacheCompression: false,

            // Babel sourcemaps are needed for debugging into node_modules
            // code.  Without the options below, debuggers like VSCode
            // show incorrect code and set breakpoints on the wrong lines.
            sourceMaps: true,
            inputSourceMap: true,
          },
        },

        // Process any JS outside of the app with Babel.
        // Unlike the application JS, we only compile the standard ES features.
        {
          test: /\.(js|mjs)$/,
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          loader: 'babel-loader',
          options: {
            ...BABEL_CONFIG,

            babelrc: false,
            compact: false,

            cacheDirectory: true,
            cacheCompression: false,

            // Babel sourcemaps are needed for debugging into node_modules
            // code.  Without the options below, debuggers like VSCode
            // show incorrect code and set breakpoints on the wrong lines.
            sourceMaps: true,
            inputSourceMap: true,
          },
        },

/*
        // "file" loader makes sure those assets get served by WebpackDevServer.
        // When you `import` an asset, you get its (virtual) filename.
        // In production, they would get copied to the `build` folder.
        // This loader doesn't use a "test" so it will catch all modules
        // that fall through the other loaders.
        {
          // Exclude `js` files to keep "css" loader working as it injects
          // its runtime that would otherwise be processed through "file" loader.
          // Also exclude `html` and `json` extensions so they get processed
          // by webpacks internal loaders.
          exclude: [ /^$/, /\.(js|cjs|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.mdx?$/ ],
          type: 'asset/resource',
        },

        // ** STOP ** Are you adding a new loader?
        // Make sure to add the new loader(s) before the "file" loader.
*/
      ],
    },
    {
      test: /\.mdx$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            ...BABEL_CONFIG,
          },
        },
        {
          loader: '@mdx-js/loader',
          options: {
          },
        },
      ],
    },

  ].filter(Boolean),
};
