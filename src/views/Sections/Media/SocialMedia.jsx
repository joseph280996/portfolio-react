import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'react-bootstrap'
import TeamMember from 'components/Avatar'
import SectionHeader from 'components/SectionHeader'
import PageSection from 'components/PageSection'
import './SocialMedia.scss'

const SocialMedia = ({ className, frontmatter }) => {
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
        <SectionHeader
          className="text-center"
          lg={12}
          header={rootHeader}
          subheader={rootSubHeader}
        />
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

SocialMedia.defaultProps = {
  className: null,
  frontmatter: null,
}

export default SocialMedia
