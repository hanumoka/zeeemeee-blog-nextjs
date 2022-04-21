// /* eslint-disable @typescript-eslint/no-var-requires */
// const withPWA = require('next-pwa');
//
// /** @type {import("next").NextConfig} */
// module.exports = withPWA({
//   pwa: {
//     disable:
//       process.env.NODE_ENV === 'development' ||
//       process.env.NODE_ENV === 'preview' ||
//       process.env.NODE_ENV === 'production',
//     // delete two lines above to enable PWA in production deployment
//     // add your own icons to public/manifest.json
//     // to re-generate manifest.json, you can visit https://tomitm.github.io/appmanifest/
//     dest: 'public',
//     register: true,
//   },
//   reactStrictMode: true,
//   eslint: {
//     dirs: ['src'],
//   },
// });

/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')(['react-icons']); // As per comment.
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  target: 'serverless',
  webpack: function (config) {
    /// below is not required for the problem described. Just for reference.(es6)
    config.module.rules.push({ test: /\.yml$/, use: 'raw-loader' });
    return config;
  },
  experimental: {
    esmExternals: false,
  },
};

module.exports = withPlugins([withTM], nextConfig);
