import React from 'react'
import PropTypes from 'prop-types'

import CircleIcon from 'components/CircleIcon'

function Linkedin({ userName }) {
  return <CircleIcon href={`https://linkedin.com/in/${userName}`} iconName="LinkedinIcon" />
}

Linkedin.propTypes = {
  userName: PropTypes.string.isRequired,
}

export default Linkedin
