import General from './entities/General'
import { baseDataUrl } from '../defines'

export default {
  state: {
    deckConstraints: {
      maxNumberOfCards: 8,
      maxNumberOfCost: 8,
    },
    generals: [],
    currentDeck: {
      cost: 0,
      cards: [],
    },
  },
  async loadBaseData () {
    const res = await fetch(baseDataUrl)
    const baseData = await res.json()
    const generals = baseData['GENERAL']
    this.state.generals = generals.map((general, index) => {
      return new General(index, general, baseData)
    })
  },
  findGeneral (id) {
    return this.state.generals[parseInt(id)]
  },
  addCard (type, data) {
    const cards = this.state.currentDeck.cards.concat([])
    cards.push({ type, data })
    const cost = this.getCardsCost(cards)
    const deck = { cost, cards }
    if (!this.isValidDeckCards(cards)) {
      return
    }
    this.state.currentDeck = deck
  },
  replaceCard (index, type, data) {
    const cards = this.state.currentDeck.cards.concat([])
    cards[index] = { type, data }
    const cost = this.getCardsCost(cards)
    const deck = { cost, cards }
    if (!this.isValidDeckCards(cards)) {
      return
    }
    this.state.currentDeck = deck
  },
  getCardsCost (cards) {
    return cards.reduce((v, { type, data }) => {
      if (type !== 'general') {
        return v
      }
      return v + data.cost
    }, 0)
  },
  isValidDeckCards (cards) {
    const {
      maxNumberOfCards,
      // maxNumberOfCost,
    } = this.state.deckConstraints
    // 枚数チェック
    if (cards.length > maxNumberOfCards) {
      return false
    }
    // コストチェック
    // const cost = cards.reduce((v, { type, data }) => {
    //   if (type !== 'general') {
    //     return v
    //   }
    //   return v + data.cost
    // }, 0)
    // if (cost > maxNumberOfCost) {
    //   return false
    // }
    // 同盟武将チェック
    return !cards.some((card) => {
      return cards
        .filter((c) => c !== card)
        .some(({ type, data }) => {
          return card.type === type &&
            card.data.personal === data.personal
        })
    })
  },
}
