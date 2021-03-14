import React from 'react'
import PropTypes from 'prop-types'
import Navbar from 'views/Navbar'
import Top from 'views/Top'
import * as Sections from 'views/Sections'
import fileNameToSectionName from 'utils/fileNameToSectionName'
import '../style/main.scss'
import 'utils/fixFontAwesome'

const LandingPage = ({
  anchors,
  navBarNode,
  langSelectorPart,
  topNode,
  sectionsNodes,
}) => {
  return (
    <>
      <Navbar
        anchors={anchors}
        frontmatter={navBarNode.frontmatter}
        extraItems={langSelectorPart}
      />
      <Top frontmatter={topNode.frontmatter} />
      {
        // dynamically import sections
        sectionsNodes.map(({ frontmatter, fields: { fileName } }, idx) => {
          const sectionComponentName = fileNameToSectionName(fileName)
          const SectionComponent = Sections[sectionComponentName]

          return SectionComponent ? (
            <SectionComponent
              className={idx % 2 === 1 ? 'background-100' : null}
              key={sectionComponentName}
              frontmatter={frontmatter}
            />
          ) : null
        })
      }
    </>
  )
}

LandingPage.propTypes = {
  anchors: PropTypes.arrayOf(PropTypes.string),
  navBarNode: PropTypes.shape({
    frontmatter: PropTypes.object,
  }),
  langSelectorPart: PropTypes.any,
  topNode: PropTypes.shape({
    frontmatter: PropTypes.object,
  }),
  sectionsNodes: PropTypes.array,
}

LandingPage.defaultProps = {
  anchors: [],
  navBarNode: {
    frontmatter: {},
  },
  langSelectorPart: null,
  topNode: {
    frontmatter: {},
  },
  sectionsNodes: [],
}

export default LandingPage
