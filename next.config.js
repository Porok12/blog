/** @type {import('next').NextConfig} */
const nextConfig = {
    // i18n: {
    //     locales: ['en', 'pl'],
    //     defaultLocale: 'en',
    // },
    output: 'export',
    experimental: {
        mdxRs: true,
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
