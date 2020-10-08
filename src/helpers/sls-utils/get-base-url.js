module.exports = meta => {
  const custom = meta.custom || {}
  const kaskadiDocs = custom['kaskadi-docs'] || {}
  const { hostname, root } = kaskadiDocs
  const origin = hostname && hostname.length > 0 ? `https://${hostname}` : ''
  const path = root && root.length > 0 ? `/${root}` : ''
  const baseUrl = origin + path
  return baseUrl.length > 0 ? { 'base-url': baseUrl } : {}
}
