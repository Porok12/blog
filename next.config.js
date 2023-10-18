const isGithub = process.env.GITHUB === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isGithub ? '/blog' : undefined,
  assetPrefix: isGithub ? '/blog/' : undefined,
  // i18n: {
  //     locales: ['en', 'pl'],
  //     defaultLocale: 'en',
  // },
  output: 'export',
  // images: {
  //   loader: "cloudinary",
  // },
  experimental: {
    typedRoutes: true,
    // mdxRs: true,
    // serverActions: true,
  },
  images: {
    unoptimized: true,
  },
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const withMDX = require('@next/mdx')({
//   options: {
//     remarkPlugins: [],
//     rehypePlugins: [],
//     // If you use `MDXProvider`, uncomment the following line.
//     // providerImportSource: "@mdx-js/react",
//   },
// })

module.exports = /*withMDX(*/nextConfig/*)*/
