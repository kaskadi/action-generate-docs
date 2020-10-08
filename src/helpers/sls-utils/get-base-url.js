module.exports = meta => {
  const custom = meta.custom || {}
  const kaskadiDocs = custom['kaskadi-docs'] || {}
  const { hostname, root } = kaskadiDocs
  const origin = hostname && hostname.length > 0 ? `https://${hostname}` : 'https://API_DOMAIN'
  const path = root && root.length > 0 ? `/${root}` : ''
  return origin + path
}
