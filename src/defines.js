const embedJsUrl = process.env.NODE_ENV === 'production'
  ? 'https://boushi-bird.github.io/3594t-tools/embed.js'
  : 'https://localhost:8443/embed.js'
const hubPageUrl = process.env.NODE_ENV === 'production'
  ? 'https://boushi-bird.github.io/3594t-tools/hub/'
  : 'https://localhost:8443/hub/'
const scriptId = 'FjwVBjy6'
const baseDataUrl = process.env.NODE_ENV === 'production'
  ? 'https://gist.githubusercontent.com/boushi-bird/9fbed1f50fadcd04ea619355b5fa7a0c/raw/base.json'
  : '/base.json'

export {
  embedJsUrl,
  hubPageUrl,
  baseDataUrl,
  scriptId,
}
