import General from './entities/General'

export default {
  state: {
    deckConstraints: {
      maxNumberOfCards: 8,
      maxNumberOfCost: 8,
    },
    generals: [],
  },
  loadBaseData () {
    // FIXME API呼び出しにする
    return Promise.resolve({
      'GENERAL': [
        {
          rarity: 'UC',
          personal: 0,
        },
        {
          rarity: 'UC',
          personal: 1,
        },
      ],
      'PERSONAL': [
        {
          name: '夏侯淵',
        },
        {
          name: '徐晃',
        },
      ],
    })
      .then((baseData) => {
        const generals = baseData['GENERAL']
        this.state.generals = generals.map((general) => {
          return new General(general, baseData)
        })
      })
  },
}
