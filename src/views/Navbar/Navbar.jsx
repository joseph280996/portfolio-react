import React from 'react'
import PropTypes from 'prop-types'

import clsx from 'clsx'

import { Navbar, Container, Nav } from 'react-bootstrap'

import useWindowOnScroll from 'hooks/useWindowOnScroll'
import useSmoothScrollTo from 'hooks/useSmoothScrollTo'
import Icon from 'components/Icon'
import NavItem from 'components/NavItem'

import './Navbar.scss'
import Image from 'components/Image'

function MyNavbar({
  frontmatter: { brand, menuText, imageFileName } = {},
  anchors = [],
  extraItems = null,
  extraNavItems = null,
}) {
  const handleScrollToTop = useSmoothScrollTo(0)

  const [expanded, setExpanded] = React.useState(false)
  const toggleMenu = React.useCallback(() => {
    setExpanded(!expanded)
  }, [expanded])
  const closeMenu = React.useCallback(() => {
    setExpanded(false)
  }, [])
  const handleBrandClick = React.useCallback(() => {
    closeMenu()
    handleScrollToTop()
  }, [closeMenu, handleScrollToTop])

  const [shrink, setShrink] = React.useState(false)
  const handleWindowScroll = React.useCallback(() => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    setShrink(scrollTop > 100)
  }, [])
  useWindowOnScroll(handleWindowScroll)

  return (
    <Navbar
      className={clsx('navbar-root', { 'navbar-shrink': shrink })}
      expand="lg"
      fixed="top"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand className="cursor-pointer" onClick={handleBrandClick}>
          <Image className="image" fileName={imageFileName} alt={brand} />
        </Navbar.Brand>
        <Navbar.Toggle onClick={toggleMenu} aria-label="Toggle navigation">
          {menuText}
          <Icon iconName="BarsIcon" />
        </Navbar.Toggle>
        <Navbar.Collapse>
          <Nav className="text-uppercase ml-auto">
            {anchors.map((anchor) => (
              <NavItem key={anchor} to={anchor} onClick={closeMenu} />
            ))}
            {extraNavItems}
          </Nav>
        </Navbar.Collapse>
      {extraItems}
      </Container>
    </Navbar>
  )
}

MyNavbar.propTypes = {
  anchors: PropTypes.arrayOf(PropTypes.string),
  frontmatter: PropTypes.object,
  extraItems: PropTypes.any,
  extraNavItems: PropTypes.any,
}

export default MyNavbar
