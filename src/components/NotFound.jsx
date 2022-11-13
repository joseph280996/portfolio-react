import { Link } from 'gatsby'
import React from 'react'
import { Button } from 'react-bootstrap'
import './NotFound.scss'

const NotFound = () => (
  <div className="notfound-container">
    <div className="error">
      <h1 className="error-code">404</h1>
      <p className="error-message">There&apos;s nothing to see here...</p>
      <Link to="/">
        <Button>Go back to home page</Button>
      </Link>
    </div>
  </div>
)

export default NotFound
