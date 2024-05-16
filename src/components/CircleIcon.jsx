import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'

import './CircleIcon.scss'

function CircleIcon({ href = '', iconName = null }) {
  return (
    <a
      className="circle-icon"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={iconName}
    >
      <Icon iconName={iconName} />
    </a>
  )
}

CircleIcon.propTypes = {
  href: PropTypes.string,
  iconName: PropTypes.string,
}

export default CircleIcon
