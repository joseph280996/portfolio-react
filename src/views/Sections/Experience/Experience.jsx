import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { Row, Col } from 'react-bootstrap'
import TimelineItem from 'components/TimelineItem'
import SectionHeader from 'components/SectionHeader'
import PageSection from 'components/PageSection'
import nl2br from 'utils/nl2br'

import './Experience.scss'

const Experience = ({ className, frontmatter }) => {
  if (!frontmatter) {
    return null
  }

  const {
    anchor,
    header: rootHeader,
    subheader: rootSubHeader,
    timeline,
  } = frontmatter

  console.log(timeline)

  return (
    <PageSection className={clsx('text-white', className)} id={anchor}>
      <Row>
        <SectionHeader
          className="text-center"
          lg={12}
          header={rootHeader}
          subheader={rootSubHeader}
        />
      </Row>
      <Row>
        <Col lg={12}>
          <ul className="timeline">
            {timeline.map(
              (
                { content, header, imageContent, imageFileName, subheader },
                ind,
              ) => (
                <TimelineItem
                  invert={ind % 2 === 1}
                  key={header}
                  imageFileName={imageFileName}
                  header={header}
                  subheader={subheader}
                  content={content}
                  imageContent={
                    imageContent ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `<h4>${nl2br(imageContent)}</h4>`,
                        }}
                      />
                    ) : null
                  }
                />
              ),
            )}
          </ul>
        </Col>
      </Row>
    </PageSection>
  )
}

Experience.propTypes = {
  className: PropTypes.string,
  frontmatter: PropTypes.object,
}

Experience.defaultProps = {
  className: null,
  frontmatter: null,
}

export default Experience
