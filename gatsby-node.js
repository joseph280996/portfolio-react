const path = require('path')
const getBaseUrl = require('./src/utils/getBaseUrl')
const { defaultLang, langTextMap = {} } = require('./config/site')

/**
 * add fileName to node for markdown files
 */
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const fileName = path.basename(node.fileAbsolutePath, '.md')
    createNodeField({
      node,
      name: 'fileName',
      value: fileName,
    })

    createNodeField({
      node,
      name: 'directoryName',
      value: path.basename(path.dirname(node.fileAbsolutePath)),
    })
  }
}

/**
 * define nullable items
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = [
    'type MarkdownRemark implements Node { frontmatter: Frontmatter }',
    `type Frontmatter {
      anchor: String
      jumpToAnchor: String
      jumpToAnchorText: String
      social: Social
      services: [Service]
      teamMember: TeamMember
    }`,
    `type TeamMember {
      social: Social
    }`,
    `type Service {
      iconName: String
      imageFileName: String
      header: String
      content: String
    }`,
    `
    type Social {
      twitter: String
      facebook: String
      linkedin: String
      medium: String
      github: String
    }
    `,
  ]

  createTypes(typeDefs)
}

/**
 * generate i18n top pages
 */
exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const landingPage = path.resolve('./src/pages/landing.jsx')
  const blogPostPage = path.resolve('./src/pages/projects.jsx')

  const result = await graphql(`
    {
      allMarkdownRemark {
        availableLang: distinct(field: fields___langKey)
        blogPages: distinct(field: frontmatter___projects___anchor)
      }
    }
  `)

  if (result.errors) {
    // eslint-disable-next-line no-console
    console.log(errors)
    return
  }

  result.data.allMarkdownRemark.availableLang.forEach((langKey) => {
    console.log(langKey)
    createPage({
      path: getBaseUrl(defaultLang, langKey),
      component: landingPage,
      context: {
        langKey,
        defaultLang,
        langTextMap,
      },
    })

    createPage({
      path: getBaseUrl(defaultLang, langKey, `blog`),
      component: blogPostPage,
      context: {
        langKey,
        defaultLang,
        langTextMap,
      },
    })
  })
}
