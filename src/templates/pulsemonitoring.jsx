import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Navbar from 'views/Navbar'
import Top from 'views/Top'
import Footer from 'views/Footer'
import * as Sections from 'views/Sections'
import SEO from 'components/SEO'
import LanguageSelector from 'components/LanguageSelector'

import fileNameToSectionName from 'utils/fileNameToSectionName'
import breakDownAllNodes from 'utils/breakDownAllNodes'

export const query = graphql`
  query BlogPostQuery($langKey: String!) {
    site {
      siteMetadata {
        keywords
        description
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { order: ASC, fields: [fields___directoryName, fields___fileName] }
    ) {
      nodes {
        frontmatter {
          brand
          anchor
          content
          copyright
          header
          email
          imageFileName
          jumpToAnchor
          jumpToAnchorText
          menuText
          projects {
            links {
              name
              description
              url
            }
            content
            extraInfo
            header
            subheader
            imageFileNameDetail
            imageFileName
          }
          services {
            content
            header
            iconName
            imageFileName
          }
          social {
            facebook
            github
            linkedin
            medium
            twitter
          }
          subheader
          teamMember {
            header
            imageFileName
            social {
              facebook
              github
              linkedin
              medium
              twitter
            }
            subheader
          }
          telephone
          title
          timeline {
            content
            header
            imageContent
            imageFileName
            subheader
          }
        }
        fields {
          fileName
          directoryName
        }
      }
    }
  }
`
const BlogPostPage = ({ data, pathContext: { langKey, defaultLang, langTextMap } }) => {
  const {
    site: {
      siteMetadata: { keywords, description },
    },
    allMarkdownRemark: { nodes },
  } = data
  const { topNode, navBarNode, anchors, footerNode, sectionsNodes } = breakDownAllNodes(nodes)
  let langSelectorPart
  if (langTextMap != null && Object.keys(langTextMap).length > 1) {
    langSelectorPart = (
      <LanguageSelector langKey={langKey} defaultLang={defaultLang} langTextMap={langTextMap} />
    )
  }
  console.log(sectionsNodes)
  return (
    <>
      <SEO lang={langKey} title="Tung Pham" keywords={keywords} description={description} />
      <Navbar
        anchors={anchors}
        frontmatter={navBarNode.frontmatter}
        extraItems={langSelectorPart}
      />
      <Top frontmatter={topNode.frontmatter} />
      <Footer frontmatter={footerNode.frontmatter} />
    </>
  )
}

BlogPostPage.propTypes = {
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object,
}

BlogPostPage.defaultProps = {
  pathContext: {
    langKey: 'en',
    defaultLang: 'en',
    langTextMap: {},
  },
}
export default BlogPostPage
