import { scriptId } from '../defines'
const pages = [
  require('./datalist/'),
  require('./members_history/'),
]

const run = () => {
  const page = pages.find(p => p.isPage(location))
  if (page) {
    page.run(document)
  }
}

global[scriptId] = run

run()
