import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'

import './LinkCard.scss'

function LinkCard({ url, name, description }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="link-no-decoration">
      <Card>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Subtitle>{url}</Card.Subtitle>
        </Card.Body>
      </Card>
    </a>
  )
}

LinkCard.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
}

LinkCard.defaultProps = {
  url: '',
  name: '',
  description: '',
}

export default LinkCard
