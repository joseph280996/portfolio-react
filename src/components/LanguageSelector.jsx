import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { Link } from 'gatsby'
import { NavDropdown } from 'react-bootstrap'

import IconText from 'components/IconText'
import getBaseUrl from 'utils/getBaseUrl'

import './LanguageSelector.scss'

function LanguageSelector({
  defaultLang = 'en',
  langKey = 'en',
  langTextMap = {
    en: 'English',
  },
}) {
  return (
    <NavDropdown
      title={<IconText iconName="LanguageIcon" text={langTextMap[langKey]} />}
      id="language-dropdown"
      className="language-selector"
    >
      {Object.keys(langTextMap).map((key) => {
        return (
          <Link
            key={key}
            to={getBaseUrl(defaultLang, key)}
            className={clsx('dropdown-item', { active: key === langKey })}
          >
            {langTextMap[key]}
          </Link>
        )
      })}
    </NavDropdown>
  )
}

LanguageSelector.propTypes = {
  defaultLang: PropTypes.string,
  langKey: PropTypes.string,
  langTextMap: PropTypes.object,
}

export default LanguageSelector
