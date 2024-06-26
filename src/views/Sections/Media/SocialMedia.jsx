import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'react-bootstrap'
import TeamMember from 'components/TeamMember'
import SectionHeader from 'components/SectionHeader'
import PageSection from 'components/PageSection'
import './SocialMedia.scss'

function SocialMedia({ className = null, frontmatter = null }) {
  if (!frontmatter) {
    return null
  }

  const {
    anchor,
    header: rootHeader,
    subheader: rootSubHeader,
    content: rootContent,
    teamMember,
  } = frontmatter
  const { header, ...tmProps } = teamMember
  return (
    <PageSection className={className} id={anchor}>
      <Row>
        <SectionHeader header={rootHeader} subheader={rootSubHeader} />
      </Row>
      <Row className="justify-content-center">
        <Col sm={4} key={header} className="align-self-center">
          <TeamMember header={header} {...tmProps} />
        </Col>
      </Row>
      <Row>
        <Col lg={8} className="mx-auto text-center">
          <p className="large text-muted">{rootContent}</p>
        </Col>
      </Row>
    </PageSection>
  )
}

SocialMedia.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
}

export default SocialMedia
