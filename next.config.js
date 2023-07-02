const isGithub = process.env.GITHUB === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
    assetPrefix: isGithub ? '/personal-blog' : undefined,
    // i18n: {
    //     locales: ['en', 'pl'],
    //     defaultLocale: 'en',
    // },
    output: 'export',
    experimental: {
        mdxRs: true,
        typedRoutes: true,
    },
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
