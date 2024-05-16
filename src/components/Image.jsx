import React from 'react'
import PropTypes from 'prop-types'

import { StaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

function Image({ fileName, alt = null, ...restProps }) {
  return (
    <StaticQuery
      query={graphql`
        query ImageQuery {
          images: allFile {
            edges {
              node {
                relativePath
                name
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH)
                }
              }
            }
          }
        }
      `}
      render={(data) => {
        const image = getImage(
          data.images.edges.find((n) => n.node.relativePath.includes(fileName))?.node,
        )

        if (!image) {
          return null
        }

        return <GatsbyImage alt={alt} image={image} {...restProps} />
      }}
    />
  )
}

Image.propTypes = {
  fileName: PropTypes.string.isRequired,
  alt: PropTypes.string,
}

export default Image
