import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { Row } from 'react-bootstrap'
import SectionHeader from 'components/SectionHeader'
import ProjectItem from 'components/ProjectItem'
import PageSection from 'components/PageSection'
import './Projects.scss'

const Project = ({ className, frontmatter }) => {
  if (!frontmatter) {
    return null
  }

  const { anchor, header: rootHeader, subheader: rootSubHeader, projects } = frontmatter
  return (
    <PageSection className={clsx('project-section', className)} id={anchor}>
      <Row>
        <SectionHeader header={rootHeader} subheader={rootSubHeader} />
      </Row>
      <Row>
        {projects.map(({ header, imageFileName, subheader }) => (
          <ProjectItem
            key={header}
            imageFileName={imageFileName}
            header={header}
            subheader={subheader}
          />
        ))}
      </Row>
    </PageSection>
  )
}

Project.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
}

Project.defaultProps = {
  className: null,
  frontmatter: null,
}

export default Project
