import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const SectionContent = ({ children, className }) => {
  return <div className={clsx(className)}>{children}</div>
}

SectionContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

SectionContent.defaultProps = {
  children: null,
  className: '',
}

export default SectionContent
