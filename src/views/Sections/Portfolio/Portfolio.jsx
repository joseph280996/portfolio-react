import React from 'react'
import PropTypes from 'prop-types'

import { Row } from 'react-bootstrap'
import SectionHeader from 'components/SectionHeader'
import PortfolioItem from 'components/PortfolioItem'
import PageSection from 'components/PageSection'
import './Portfolio.scss'

const Portfolio = ({ className, frontmatter }) => {
  if (!frontmatter) {
    return null
  }

  const { anchor, header: rootHeader, subheader: rootSubHeader, portfolios } = frontmatter
  return (
    <PageSection className={className} id={anchor}>
      <Row>
        <SectionHeader
          lg={12}
          className="text-white text-center"
          header={rootHeader}
          subheader={rootSubHeader}
        />
      </Row>
      <Row>
        {portfolios.map(
          ({
            description,
            extraInfo,
            header,
            imageFileName,
            imageFileNameDetail,
            subheader,
            links,
          }) => (
            <PortfolioItem
              key={header}
              imageFileName={imageFileName}
              header={header}
              subheader={subheader}
              description={description}
              imageFileNameDetail={imageFileNameDetail}
              extraInfo={extraInfo}
              links={links}
            />
          ),
        )}
      </Row>
    </PageSection>
  )
}

Portfolio.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
}

Portfolio.defaultProps = {
  className: null,
  frontmatter: null,
}

export default Portfolio
