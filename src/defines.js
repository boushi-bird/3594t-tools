const embedJsUrl = process.env.NODE_ENV === 'production'
  ? 'https://boushi-bird.github.io/3594t-tools/embed.js'
  : 'https://localhost:8443/embed.js'
const hubPageUrl = process.env.NODE_ENV === 'production'
  ? 'https://boushi-bird.github.io/3594t-tools/hub/'
  : 'https://localhost:8443/hub/'
const scriptId = 'FjwVBjy6'

export {
  embedJsUrl,
  hubPageUrl,
  scriptId,
}
