export default class PageParser {
  constructor (baseData) {
    this.baseData = baseData
  }

  parse (element) {
    const deckBlocks = element.getElementsByClassName('data_deck_cardblock')
    const deckDataClocks = element.getElementsByClassName('record_row')
    const stratDataBlocks = Array.prototype.find.call(deckDataClocks, block => {
      return block.querySelector('img[alt="計略"]')
    })
    const strategies = Array.prototype.map.call(stratDataBlocks.getElementsByTagName('td'), block => {
      if (!block.hasChildNodes() || block.childNodes.length === 0) {
        return {
          all: 0,
          red: 0,
          blue: 0,
        }
      }
      const all = parseInt(block.childNodes[0].nodeValue.trim())
      const redStrat = block.querySelector('span.text_red_light')
      const blueStrat = block.querySelector('span.text_sky')
      const red = redStrat ? parseInt(redStrat.innerHTML) : 0
      const blue = blueStrat ? parseInt(blueStrat.innerHTML) : 0
      return {
        all,
        red,
        blue,
      }
    })
    return Array.prototype.map.call(deckBlocks, block => {
      const img = block.querySelector('.data_deck_cardblock_card img')
      return img.getAttribute('src').match(/^\/img\/card_slim(_[0-9]+)?\/([0-9a-f]+)\.(jpg|png)/)[2]
    }).map((code, index) => {
      const general = this.baseData['GENERAL'].find(g => (g.code === code || g.pocket_code === code))
      return {
        general: this._createLabeledGeneral(general),
        useStrategy: strategies[index].all > 0,
      }
    })
  }

  _createLabeledGeneral (general) {
    if (!general) {
      return null
    }
    const personal = this.baseData['PERSONAL'][parseInt(general.personal)]
    const state = this.baseData['STATE'][parseInt(general['state'])].name
    const major = general['major_version']
    const verType = this.baseData['VER_TYPE'][parseInt(general['ver_type'])]
    const minor = verType.name === 'Ex' ? 'EX' : general['add_version']
    const version = minor === '0' ? `第${major}弾` : `第${major}弾-${minor}`
    const strategy = this.baseData['STRAT'].find(strat => strat.key === general['strat']).name

    return {
      name: personal.name,
      rarity: general.rarity,
      state,
      version,
      strategy,
    }
  }
}
