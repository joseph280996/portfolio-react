import React from 'react'
import PropTypes from 'prop-types'

import { Col } from 'react-bootstrap'
import Image from 'components/Image'
import Icon from 'components/Icon'

import './ProjectItem.scss'
import { Link } from 'gatsby'

function ProjectItem({ imageAlt = '', subheader = '', imageFileName, header }) {
  return (
    <Col md={4} sm={6} className="project-item">
      <Link className="project-link" to="/blog">
        <Image
          className="img-fluid"
          fileName={imageFileName}
          alt={imageAlt || header || subheader}
        />
        <div className="project-hover">
          <div className="project-hover-content">
            <Icon iconName="PlusIcon" size="2x" />
          </div>
        </div>
      </Link>
      <div className="project-caption">
        <h4>{header}</h4>
        {subheader ? <p className="text-muted">{subheader}</p> : null}
      </div>
    </Col>
  )
}

ProjectItem.propTypes = {
  imageFileName: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
}

export default ProjectItem
