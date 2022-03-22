function getBaseUrl(defaultLang, lang, customRoute) {
  return `/${customRoute ? `${customRoute}/` : ''}${defaultLang !== lang ? `${lang}/` : ''}`
}

module.exports = getBaseUrl
