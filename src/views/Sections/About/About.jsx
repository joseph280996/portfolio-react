import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col } from 'react-bootstrap'

import ServiceItem from 'components/ServiceItem'
import SectionHeader from 'components/SectionHeader'
import PageSection from 'components/PageSection'

function About({ className = null, frontmatter = null }) {
  if (!frontmatter) {
    return null
  }

  const { anchor, header: rootHeader, subheader: rootSubHeader, services } = frontmatter

  return (
    <PageSection className={className} id={anchor}>
      <Row>
        <SectionHeader header={rootHeader} subheader={rootSubHeader} />
      </Row>
      <Row className="text-center">
        {services.map((service) => (
          <Col md={4} key={service.header}>
            <ServiceItem {...service} />
          </Col>
        ))}
      </Row>
    </PageSection>
  )
}

About.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
}

export default About
