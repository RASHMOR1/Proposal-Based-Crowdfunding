/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },

  // experimental: {
  //   serverAction: true,
  // },
};

module.exports = nextConfig;

// next.config.js

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,

//   webpack: (config) => {
//     config.resolve.fallback = { fs: false, net: false, tls: false };
//     config.externals.push("pino-pretty", "lokijs", "encoding");
//     return config;
//   },

//   async headers() {
//     return [
//       {
//         // Apply these headers to all routes in your application.
//         source: "/(.*)",
//         headers: [
//           {
//             key: "Content-Security-Policy",
//             value:
//               "default-src 'self'; script-src 'self' 'unsafe-eval'; object-src 'none';",
//           },
//           {
//             key: "X-Content-Type-Options",
//             value: "nosniff",
//           },
//           {
//             key: "X-Frame-Options",
//             value: "DENY",
//           },
//           {
//             key: "X-XSS-Protection",
//             value: "1; mode=block",
//           },
//           {
//             key: "Strict-Transport-Security",
//             value: "max-age=63072000; includeSubDomains; preload",
//           },
//         ],
//       },
//     ];
//   },
// };

// module.exports = nextConfig;
