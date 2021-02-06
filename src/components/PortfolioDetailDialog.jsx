import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Button } from 'react-bootstrap'
import Image from 'components/Image'
import LinkCard from 'components/LinkCard'
import Icon from './Icon'

const PortfolioDetailDialog = ({
  onHide,
  imageFileName,
  imageAlt,
  header,
  subheader,
  content,
  extraInfo,
  links,
  ...restProps
}) => {
  return (
    <Modal
      {...restProps}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{header}</Modal.Title>
      </Modal.Header>
      <div>
        {extraInfo.startDate} | {extraInfo.status}
      </div>
      <Modal.Body className="mx-auto">
        <p className="item-intro text-muted">{subheader}</p>
        <Image
          className="img-fluid d-block"
          fileName={imageFileName}
          alt={imageAlt || header || subheader}
        />
        <p>{content}</p>
        {extraInfo.publications && (
          <ul>
            {extraInfo.publications.map((publication) => (
              <li key={publication}>{publication}</li>
            ))}
          </ul>
        )}
        {links &&
          links.map(({ url, name, description }) => (
            <LinkCard key={url} url={url} name={name} description={description} />
          ))}
      </Modal.Body>
      <Modal.Footer>
        <div className="mx-auto">
          <Button variant="primary" onClick={onHide}>
            <Icon iconName="CloseIcon" />
            &nbsp; Close Project
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

PortfolioDetailDialog.propTypes = {
  onHide: PropTypes.func,
  imageFileName: PropTypes.string,
  imageAlt: PropTypes.string,
  header: PropTypes.string,
  subheader: PropTypes.string,
  content: PropTypes.string,
  extraInfo: PropTypes.any,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
}

PortfolioDetailDialog.defaultProps = {
  onHide: null,
  imageFileName: '',
  imageAlt: null,
  header: '',
  subheader: '',
  content: '',
  extraInfo: null,
  links: null,
}

export default PortfolioDetailDialog
