#!/usr/bin/env babel-node

import path from 'path'
import fs from 'fs'
import UglifyJS from 'uglify-es'
import { scriptId, embedJsUrl } from '../src/defines'

const bookmarkletFile = path.resolve(__dirname, '../src/bookmarklet/index.js')

const content = fs.readFileSync(bookmarkletFile, 'utf-8')

const builtJs = content
  .replace('<JS_URL>', embedJsUrl)
  .replace('<SCRIPT_ID>', scriptId)

const { code, error } = UglifyJS.minify(builtJs, {
  mangle: true,
  compress: {
    expression: true,
    evaluate: false,
    reduce_vars: false,
  },
})

if (error) {
  console.error(error)
  process.exit(1)
} else {
  console.log(`javascript:${encodeURIComponent(code)}`)
}
