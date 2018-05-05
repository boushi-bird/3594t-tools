require('babel-polyfill')
const { CrossStorageClient } = require('cross-storage')
const { hubPageUrl } = require('../../defines')
const PageParser = require('./page-parser')

const run = async (document) => {
  const clinet = new CrossStorageClient(hubPageUrl)
  await clinet.onConnect()
  const savedBaseData = await clinet.get('3594t.baseData')
  if (!savedBaseData) {
    alert(`[三国志大戦 ブックマークレット]
先にデータリストのページで情報を保存する必要があります`)
    return
  }
  const baseData = JSON.parse(savedBaseData)
  const parser = new PageParser(baseData)
  const [ selfDetail, opponentDetail ] = document.getElementsByClassName('battledetail_inner_block')

  const selfDeck = parser.parse(selfDetail)
  const opponentDeck = parser.parse(opponentDetail)

  let text = ''
  text += '[自分]\n'
  selfDeck.forEach(general => {
    text += `第${general.version}弾 ${general.rarity}${general.name}
`
  })
  text += '\n'
  text += '[相手]\n'
  opponentDeck.forEach(general => {
    text += `第${general.version}弾 ${general.rarity}${general.name}
`
  })
  const displayArea = document.createElement('textarea')
  displayArea.style.position = 'absolute'
  displayArea.style.top = '0px'
  displayArea.style.left = '0px'
  displayArea.style.minWidth = '240px'
  displayArea.style.minHeight = '400px'
  displayArea.style.zIndex = 1000
  displayArea.innerHTML = text
  document.body.appendChild(displayArea)
}

module.exports.isPage = (location) => {
  return /^\/?members\/history\/detail\/?$/.test(location.pathname)
}

module.exports.run = run
