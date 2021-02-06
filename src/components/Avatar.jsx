import React from 'react'
import PropTypes from 'prop-types'

import Image from 'components/Image'

import './Avatar.scss'

const Avatar = ({ imageFileName, imageAlt }) => {
  return (
    <div className="team-member">
      <Image className="ml-0 ava-img" fileName={imageFileName} alt={imageAlt} />
    </div>
  )
}

Avatar.propTypes = {
  imageFileName: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
}

Avatar.defaultProps = {
  imageAlt: null,
}

export default Avatar
