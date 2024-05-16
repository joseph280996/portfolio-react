import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { Container } from 'react-bootstrap'

import './PageSection.scss'

function PageSection({ children = null, className = null, ...restProps }) {
  return (
    <section className={clsx('page-section', className)} {...restProps}>
      <Container>{children}</Container>
    </section>
  )
}

PageSection.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
}

export default PageSection
