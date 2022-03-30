function getBaseUrl(defaultLang, lang, customRoute) {
  return `/${defaultLang !== lang ? `${lang}/` : ''}${customRoute ? `${customRoute}/` : ''}`
}

module.exports = getBaseUrl
