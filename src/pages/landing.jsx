import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Navbar from 'views/Navbar'
import Top from 'views/Top'
import Footer from 'views/Footer'
import * as Sections from 'views/Sections'
import SEO from 'components/SEO'
import LanguageSelector from 'components/LanguageSelector'

import 'utils/fixFontAwesome'
import breakDownAllNodes from 'utils/breakDownAllNodes'
import fileNameToSectionName from 'utils/fileNameToSectionName'

import '../style/main.scss'
import { Nav } from 'react-bootstrap'
import getBaseUrl from 'utils/getBaseUrl'

/**
 * get file name list from content/sections folder
 */
export const query = graphql`
  query IndexQuery($langKey: String!) {
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

function LandingPage({
  data,
  pathContext: { langKey, defaultLang, langTextMap } = {
    langKey: 'en',
    defaultLang: 'en',
    langTextMap: {},
  },
}) {
  const {
    site: {
      siteMetadata: { keywords, description },
    },
    allMarkdownRemark: { nodes },
  } = data
  const { topNode, navBarNode, anchors, footerNode, sectionsNodes } = breakDownAllNodes(nodes)
  const langSelectorPart =
    langTextMap != null && Object.keys(langTextMap).length > 1 ? (
      <LanguageSelector langKey={langKey} defaultLang={defaultLang} langTextMap={langTextMap} />
    ) : null

  return (
    <>
      <SEO lang={langKey} title="Tung Pham" keywords={keywords} description={description} />
      <Navbar
        anchors={anchors}
        frontmatter={navBarNode.frontmatter}
        extraNavItems={
          <Nav.Item>
            <Link to={getBaseUrl(defaultLang, langKey, 'blog')}>BLOGS</Link>
          </Nav.Item>
        }
        extraItems={langSelectorPart}
      />
      <Top frontmatter={topNode.frontmatter} />
      {
        // dynamically import sections
        sectionsNodes.map(({ frontmatter, fields: { fileName } }, ind) => {
          const sectionComponentName = fileNameToSectionName(fileName)
          const SectionComponent = Sections[sectionComponentName]

          return SectionComponent && frontmatter ? (
            <SectionComponent
              key={sectionComponentName}
              className={ind % 2 === 1 ? 'bg-light' : null}
              frontmatter={frontmatter}
            />
          ) : null
        })
      }
      <Footer frontmatter={footerNode.frontmatter} />
    </>
  )
}

LandingPage.propTypes = {
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object,
}

export default LandingPage
