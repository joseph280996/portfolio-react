import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'react-bootstrap'
import * as SocialIcons from 'components/SocialIcons'

import './Footer.scss'

const Footer = ({ frontmatter }) => {
  if (!frontmatter) {
    return null
  }

  const {
    copyright,
    social: { facebook, github, linkedin, twitter },
  } = frontmatter

  return (
    <footer className="footer py-3">
      <Container>
        <Row className="align-items-center text-center">
          <Col lg={5} className="text-lg-left">
            <span className="copyright">{copyright}</span>
          </Col>
          <Col lg={3} className="my-3 my-lg-0">
            {twitter ? <SocialIcons.Twitter userName={twitter} /> : null}
            {facebook ? <SocialIcons.Facebook userName={facebook} /> : null}
            {linkedin ? <SocialIcons.Linkedin userName={linkedin} /> : null}
            {github ? <SocialIcons.Github userName={github} /> : null}
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

Footer.propTypes = {
  frontmatter: PropTypes.object,
}

Footer.defaultProps = {
  frontmatter: null,
}

export default Footer
