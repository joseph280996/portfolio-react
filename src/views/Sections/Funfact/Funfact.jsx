import React from 'react'
import PropTypes from 'prop-types'

import { Col, Row, Button } from 'react-bootstrap'
import SectionHeader from 'components/SectionHeader'
import SectionContent from 'components/SectionContent'
import PageSection from 'components/PageSection'
import Avatar from 'components/Avatar'
import './Funfact.scss'

const Funfact = (props) => {
  const { className, frontmatter } = props
  if (!frontmatter) {
    return null
  }

  const {
    anchor,
    header: rootHeader,
    imageFileName,
    subheader: rootSubHeader,
    facts,
  } = frontmatter

  return (
    <PageSection className={className} id={anchor}>
      <Row>
        <Col lg={4}>
          <Avatar imageFileName={imageFileName} imageAlt={imageFileName} />
        </Col>
        <Col lg={8}>
          <SectionHeader
            className="text-white"
            header={rootHeader}
            subheader={rootSubHeader}
          />
          <SectionContent className="section-content text-white">
            <ul>
              {facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <Button type="button">See What I&apos;m Up To &gt;</Button>
          </SectionContent>
        </Col>
      </Row>
    </PageSection>
  )
}

Funfact.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
}

Funfact.defaultProps = {
  className: null,
  frontmatter: null,
}

export default Funfact
