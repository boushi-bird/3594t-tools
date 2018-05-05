const { scriptId } = require('../defines')

const run = () => {
  const page = require('./datalist/')
  page.run()
}

global[scriptId] = run

run()
