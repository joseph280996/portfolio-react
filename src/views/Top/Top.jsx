import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'
import useSmoothScrollTo from 'hooks/useSmoothScrollTo'
import ImageCard from 'components/ImageCard'

import './Top.scss'

function Top({ frontmatter = null }) {
  if (!frontmatter) {
    return null
  }

  const { header, subheader, imageFileName, jumpToAnchor, jumpToAnchorText } = frontmatter
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const scrollToSection = useSmoothScrollTo(jumpToAnchor)

  let extraInfoPart
  if (jumpToAnchor && jumpToAnchorText) {
    extraInfoPart = (
      <Button size="xl" variant="primary" className="text-uppercase learn-more-btn" onClick={scrollToSection}>
        {jumpToAnchorText}
      </Button>
    )
  }

  return (
    <ImageCard
      imageFileName={imageFileName}
      header={header}
      subheader={subheader}
      extraInfo={extraInfoPart}
    />
  )
}

Top.propTypes = {
  frontmatter: PropTypes.object,
}

export default Top
