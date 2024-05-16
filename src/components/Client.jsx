import React from 'react'
import PropTypes from 'prop-types'

import Image from 'components/Image'

function Client({ imageFileName, href = null }) {
  const imgPart = (
    <Image className="img-fluid d-block mx-auto" fileName={imageFileName} alt={imageFileName} />
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {imgPart}
      </a>
    )
  }

  return imgPart
}

Client.propTypes = {
  imageFileName: PropTypes.string.isRequired,
  href: PropTypes.string,
}

export default Client
