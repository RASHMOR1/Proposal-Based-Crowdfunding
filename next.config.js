// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,

//   webpack: (config) => {
//     config.resolve.fallback = { fs: false, net: false, tls: false };
//     config.externals.push("pino-pretty", "lokijs", "encoding");
//     return config;
//   },

//   // experimental: {
//   //   serverAction: true,
//   // },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  // experimental: {
  //   serverAction: true,
  // },
};

module.exports = nextConfig;
