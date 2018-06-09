export default class General {
  constructor (id, general, baseData) {
    this._id = id
    this._general = general
    this._personal = baseData['PERSONAL'][parseInt(general.personal)]
    this._state = baseData['STATE'][parseInt(general.state)]
  }

  get id () {
    return this._id.toString()
  }

  get name () {
    return this._personal.name
  }

  get rarity () {
    return this._general.rarity
  }

  get thumbnail () {
    return `https://3594t.net/img/card_slim/${this._general.code}.jpg`
  }

  get personal () {
    return this._personal
  }

  get cost () {
    return parseInt(this._general.cost) / 10
  }

  get stateColor () {
    const { red, green, blue } = this._state
    return { red, green, blue }
  }
}
