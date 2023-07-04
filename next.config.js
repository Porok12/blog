const isGithub = process.env.GITHUB === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: isGithub ? '/personal-blog' : undefined,
    assetPrefix: isGithub ? '/personal-blog/' : undefined,
    // i18n: {
    //     locales: ['en', 'pl'],
    //     defaultLocale: 'en',
    // },
    output: 'export',
    // images: {
    //   loader: "cloudinary",
    // },
    experimental: {
        mdxRs: true,
        typedRoutes: true,
    },
    images: {
        unoptimized: true
    }
};

const withMDX = require('@next/mdx')({
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
        // If you use `MDXProvider`, uncomment the following line.
        // providerImportSource: "@mdx-js/react",
    },
});

module.exports = withMDX(nextConfig);
