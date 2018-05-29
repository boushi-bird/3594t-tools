import path from 'path'
import fs from 'fs'
import { scriptId, embedJsUrl } from '../src/defines'

const bookmarkletFile = path.resolve(__dirname, '../src/bookmarklet/index.js')

const content = fs.readFileSync(bookmarkletFile, 'utf-8')

const builtJs = content
  .replace('<JS_URL>', embedJsUrl)
  .replace('<SCRIPT_ID>', scriptId)

console.log(builtJs)
