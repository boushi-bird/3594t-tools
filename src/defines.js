module.exports = {
  embedJsUrl: process.env.NODE_ENV === 'production'
    ? 'https://boushi-bird.github.io/3594t-tools/embed.js'
    : 'http://localhost:8080/embed.js',
  hubPageUrl: process.env.NODE_ENV === 'production'
    ? 'https://boushi-bird.github.io/3594t-tools/hub/'
    : 'http://localhost:8080/hub/',
  scriptId: 'FjwVBjy6'
}
