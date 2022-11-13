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
exports.createPages = ({ graphql, actions: { createPage } }) => {
  const topIndex = path.resolve('./src/pages/landing.jsx')
  const blogPost = path.resolve('./src/pages/projects.jsx')

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              availableLang: distinct(field: fields___langKey)
              blogPages: distinct(field: frontmatter___projects___anchor)
              nodes {
                fields {
                  langKey
                }
                frontmatter {
                  anchor
                  projects {
                    anchor
                    header
                  }
                }
              }
            }
          }
        `,
      ).then(({ errors, data }) => {
        if (errors) {
          // eslint-disable-next-line no-console
          console.log(errors)
          reject(errors)
        }

        data.allMarkdownRemark.availableLang.forEach((langKey) => {
          createPage({
            path: getBaseUrl(defaultLang, langKey),
            component: topIndex,
            context: {
              langKey,
              defaultLang,
              langTextMap,
            },
          })
          data.allMarkdownRemark.blogPages.forEach((page) => {
            createPage({
              path: getBaseUrl(defaultLang, langKey, `blog/${page}`),
              component: blogPost,
              context: {
                langKey,
                defaultLang,
                blogAnchor: page,
                langTextMap,
              },
            })
          })

          return null
        })
      }),
    )
  })
}
