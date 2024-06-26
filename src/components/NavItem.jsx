import React from 'react'
import PropTypes from 'prop-types'

import { Nav } from 'react-bootstrap'
import { Link } from 'react-scroll'

import './NavItem.scss'

function NavItem({ to = '', onClick = null, children = null }) {
  return (
    <Nav.Item>
      <Link
        className="nav-link cursor-pointer"
        activeClass="active"
        to={to}
        spy
        smooth="easeInOutQuart"
        onClick={onClick}
      >
        {children || to}
      </Link>
    </Nav.Item>
  )
}

NavItem.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
}

export default NavItem
