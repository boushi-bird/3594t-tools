#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const { scriptId, embedJsUrl } = require('../src/defines')

const bookmarkletFile = path.resolve(__dirname, '../src/bookmarklet/index.js')

const content = fs.readFileSync(bookmarkletFile, 'utf-8')

const builtJs = content
  .replace('<JS_URL>', embedJsUrl)
  .replace('<SCRIPT_ID>', scriptId)

console.log(builtJs)
