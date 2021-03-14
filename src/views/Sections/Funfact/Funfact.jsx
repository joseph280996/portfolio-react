import React from 'react'
import PropTypes from 'prop-types'

import { Col, Row, Button } from 'react-bootstrap'
import SectionHeader from 'components/SectionHeader'
import SectionContent from 'components/SectionContent'
import PageSection from 'components/PageSection'
import Avatar from 'components/Avatar'
import './Funfact.scss'
import useSmoothScrollTo from 'hooks/useSmoothScrollTo'

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
    jumpToAnchor,
    jumpToAnchorText,
  } = frontmatter

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const scrollToSection = useSmoothScrollTo(jumpToAnchor)

  return (
    <PageSection className={className} id={anchor}>
      <Row className="justify-content-md-center">
        <SectionHeader
          className="text-white"
          header={rootHeader}
          subheader={rootSubHeader}
        />
      </Row>
      <Row>
        <Col className="Funfact-image" lg={4}>
          <Avatar imageFileName={imageFileName} imageAlt={imageFileName} />
        </Col>
        <Col lg={8} className="Funfact-content">
          <div className="Funfact-contentWrapper">
            <SectionContent className="section-content text-white">
              <ul className="Funfact-items">
                {facts.map((fact) => (
                  <li className="Funfact-item" key={fact}>
                    {fact}
                  </li>
                ))}
              </ul>
              <Button type="button" onClick={scrollToSection}>
                {jumpToAnchorText}
              </Button>
            </SectionContent>
          </div>
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
