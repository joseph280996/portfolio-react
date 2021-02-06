import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { Col } from 'react-bootstrap'
import './SectionHeader.scss'

const SectionHeader = ({ header, subheader, className, children, ...restProps }) => {
  const subheaderPart = subheader ? (
    <h3 className="section-subheading text-muted">{subheader}</h3>
  ) : null

  return (
    <Col className={clsx('section-header', className)} {...restProps}>
      <h2 className="section-heading text-uppercase">{header}</h2>
      {subheaderPart}
    </Col>
  )
}

SectionHeader.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
}

SectionHeader.defaultProps = {
  header: '',
  subheader: '',
  className: null,
  children: null,
}

export default SectionHeader
