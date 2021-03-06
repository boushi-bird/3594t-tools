import { CrossStorageClient } from 'cross-storage'
import { hubPageUrl } from '../../defines'
import PageParser from './page-parser'

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
  const cardTemplate = ({general, useStrategy}) => {
    const strategy = useStrategy ? ` (${general.strategy})` : ''
    return `${general.state} ${general.version} ${general.rarity}${general.name}${strategy}
`
  }
  selfDeck.forEach(d => {
    text += cardTemplate(d)
  })
  text += '\n'
  text += '[相手]\n'
  opponentDeck.forEach(d => {
    text += cardTemplate(d)
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

const isPage = (location) => {
  return /^\/?members\/history\/detail\/?$/.test(location.pathname)
}

export default { isPage, run }
