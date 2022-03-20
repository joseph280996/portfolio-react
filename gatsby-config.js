const path = require('path')
const { title, keywords, description, author, defaultLang, trackingId } = require('./config/site')

module.exports = {
  siteMetadata: {
    title,
    keywords,
    description,
    author,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: title,
        short_name: 'Agency',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#24b0bd',
        display: 'minimal-ui',
        icon: 'content/assets/logo.png',
      },
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown',
        path: `${__dirname}/content`,
      },
    },
    'gatsby-plugin-eslint',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/content/assets/images`,
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        additionalData: `@import "core.scss";`,
        sassOptions: {
          includePaths: [`${__dirname}/src/style`],
        },
      },
    },
    // {
    //   resolve: "gatsby-plugin-prefetch-google-fonts",
    //   options: {
    //     fonts: [
    //       {
    //         family: "Montserrat",
    //         variants: [400, 700],
    //       },
    //       {
    //         family: "Kaushan+Script",
    //       },
    //       {
    //         family: "Droid+Serif",
    //         variants: [400, 700, "400italic", "700italic"],
    //       },
    //       {
    //         family: "Roboto+Slab",
    //         variants: [400, 100, 300, 700],
    //       },
    //     ],
    //   },
    // },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: defaultLang,
        useLangKeyLayout: false,
        pagesPaths: ['/content/'],
      },
    },
  ],
}
