/**
 * Map Projects content according to its language
 */
function getBlogRoutingInfoFromNode(nodes) {
  return nodes.reduce((blogPagesInfo, node) => {
    if (node.frontmatter.anchor === 'Projects') {
      blogPagesInfo[node.fields.langKey] = node.frontmatter.projects
    }
    return blogPagesInfo
  }, {})
}

module.exports = getBlogRoutingInfoFromNode
