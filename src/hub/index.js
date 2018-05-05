const { CrossStorageHub } = require('cross-storage')

CrossStorageHub.init([
  {
    origin: /3594t\.net$/,
    allow: ['get', 'set']
  }
])
