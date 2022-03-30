const path = require('path')
const getBaseUrl = require('./src/utils/getBaseUrl')
const getBlogRoutingInfoFromNode = require('./src/utils/getBlogRoutingInfoFromNode')
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
  const topIndex = path.resolve('./src/templates/top-index.jsx')
  const blogPost = path.resolve('./src/templates/pulsemonitoring.jsx')

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              distinct(field: fields___langKey)
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

        data.allMarkdownRemark.distinct.forEach((langKey) => {
          createPage({
            path: getBaseUrl(defaultLang, langKey),
            component: topIndex,
            context: {
              langKey,
              defaultLang,
              langTextMap,
            },
          })
        })
        console.log(data.allMarkdownRemark.nodes)
        const blogsRoutingInfo = getBlogRoutingInfoFromNode(data.allMarkdownRemark.nodes)
        console.log(blogsRoutingInfo)
        data.allMarkdownRemark.distinct.forEach((langKey) => {
          const langKeyBlogRoutingInfo = blogsRoutingInfo[langKey]
          langKeyBlogRoutingInfo.forEach((page) => {
            createPage({
              path: getBaseUrl(defaultLang, langKey, `blog/${page.anchor}`),
              component: blogPost,
              context: {
                langKey,
                defaultLang,
                langTextMap,
              },
            })
          })
        })

        return null
      }),
    )
  })
}
