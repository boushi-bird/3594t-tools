import General from './entities/General'
import { baseDataUrl } from '../defines'

export default {
  state: {
    showDeck: true,
    deckConstraints: {
      maxNumberOfCards: 8,
      maxNumberOfCost: 8,
    },
    generals: [],
    currentDeck: {
      cost: 0,
      cards: [],
      addable: true,
      constraintViolations: [],
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
  _updateCard (update) {
    const cards = update(this.state.currentDeck.cards.concat([]))
    const cost = this.getCardsCost(cards)
    const {
      constraintViolations,
      addable,
    } = this.deckConstraintViolations(cards)
    const deck = {
      cost,
      cards,
      constraintViolations,
      addable,
    }
    this.state.currentDeck = deck
  },
  addCard (type, data) {
    if (!this.isAddable()) {
      return
    }
    const exists = this.state.currentDeck.cards.some((card) => {
      return card.type === type && card.data === data
    })
    if (exists) {
      return
    }
    this._updateCard((cards) => {
      cards.push({ type, data })
      return cards
    })
  },
  replaceCard (index, type, data) {
    this._updateCard((cards) => {
      const i = cards.findIndex((card) => {
        return card.type === type && card.data === data
      })
      if (i >= 0) {
        // 場所入れ替え
        const tmp = cards[index]
        cards[index] = cards[i]
        cards[i] = tmp
      } else {
        cards[index] = { type, data }
      }
      return cards
    })
  },
  removeCard (type, data) {
    this._updateCard((cards) => {
      return cards
        .filter((c) => c.type !== type || c.data !== data)
    })
  },
  getCardsCost (cards) {
    return cards.reduce((v, { type, data }) => {
      if (type !== 'general') {
        return v
      }
      return v + data.cost
    }, 0)
  },
  isAddable () {
    return this.state.currentDeck.addable
  },
  deckConstraintViolations (cards) {
    const violations = []
    const {
      maxNumberOfCards,
      maxNumberOfCost,
    } = this.state.deckConstraints
    // 枚数チェック
    const addable = cards.length < maxNumberOfCards
    if (cards.length > maxNumberOfCards) {
      violations.push('枚数オーバー')
    }
    // コストチェック
    const cost = cards.reduce((v, { type, data }) => {
      if (type !== 'general') {
        return v
      }
      return v + data.cost
    }, 0)
    if (cost > maxNumberOfCost) {
      violations.push('コストオーバー')
    }
    // 同盟武将チェック
    const hasSame = cards.some((card) => {
      return cards
        .filter((c) => c !== card)
        .some(({ type, data }) => {
          return card.type === type &&
            card.data.personal === data.personal
        })
    })
    if (hasSame) {
      violations.push('同名武将あり')
    }
    return { constraintViolations: violations, addable }
  },
}
