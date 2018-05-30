export default class General {
  constructor (general, baseData) {
    this.general = general
    this.personal = baseData['PERSONAL'][parseInt(general.personal)]
  }

  get name () {
    return `${this.general.rarity}${this.personal.name}`
  }
}
