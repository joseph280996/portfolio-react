import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import Image from 'components/Image'

import './TimelineItem.scss'

const TimelineItem = ({
  invert,
  imageFileName,
  imageAlt,
  imageContent,
  header,
  subheader,
  content,
}) => {
  const headerPart = header ? <h4>{header}</h4> : null
  const subheaderPart = subheader ? <h4 className="subheading">{subheader}</h4> : null

  const liClassName = clsx('timeline-item', { 'timeline-inverted': invert })
  // eslint-disable-next-line no-console
  console.log(imageFileName === 'about/2.jpg' && 'rounded-circle')
  return (
    <li className={liClassName}>
      <div className={clsx('timeline-image', imageFileName !== 'about/2.jpg' && 'circle')}>
        {imageContent || (
          <Image
            className={clsx(imageFileName !== 'about/2.jpg' && 'rounded-circle', 'img-fluid')}
            fileName={imageFileName}
            alt={imageAlt || header || subheader}
          />
        )}
      </div>
      <div className="timeline-panel">
        <div className="timeline-heading">
          {headerPart}
          {subheaderPart}
        </div>
        <div className="timeline-body">
          <p className="text-muted">{content}</p>
        </div>
      </div>
    </li>
  )
}

TimelineItem.propTypes = {
  invert: PropTypes.bool,
  imageFileName: PropTypes.string,
  imageAlt: PropTypes.string,
  imageContent: PropTypes.any,
  header: PropTypes.string,
  subheader: PropTypes.string,
  content: PropTypes.string,
}

TimelineItem.defaultProps = {
  invert: false,
  imageFileName: '',
  imageAlt: '',
  imageContent: null,
  header: '',
  subheader: '',
  content: '',
}

export default TimelineItem
