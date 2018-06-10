import 'babel-polyfill'
import { scriptId } from '../defines'
import PageConponents from './page-components'

const run = () => {
  const page = PageConponents.find(p => p.isPage(location))
  if (page) {
    page.run(document)
  }
}

global[scriptId] = run

run()
