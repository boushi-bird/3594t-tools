class PageParser {
  constructor (baseData) {
    this.baseData = baseData
  }

  parse (element) {
    const deckBlocks = element.getElementsByClassName('data_deck_cardblock')
    return Array.prototype.map.call(deckBlocks, block => {
      const img = block.querySelector('.data_deck_cardblock_card img')
      return img.getAttribute('src').match(/^\/img\/card_slim\/([0-9a-f]+)\.jpg/)[1]
    }).map(code => {
      const general = this.baseData['GENERAL'].find(g => (g.code === code || g.pocket_code === code))
      return this._createLabeledGeneral(general)
    })
  }

  _createLabeledGeneral (general) {
    if (!general) {
      return null
    }
    const personal = this.baseData['PERSONAL'][parseInt(general.personal)]
    const major = general['major_version']
    const verType = this.baseData['VER_TYPE'][parseInt(general['ver_type'])]
    const minor = verType.name === 'Ex' ? 'EX' : general['add_version']
    const version = minor === '0' ? major : `${major}-${minor}`

    return {
      name: personal.name,
      rarity: general.rarity,
      version
    }
  }
}

module.exports = PageParser
