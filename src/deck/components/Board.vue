<template>
  <div>
    <h3>デッキ</h3>
    <div>
      コスト: {{state.currentDeck.cost}} /  {{state.deckConstraints.maxNumberOfCost}}
      枚数: {{state.currentDeck.cards.length}} /  {{state.deckConstraints.maxNumberOfCards}}
    </div>
    <div class="deck-container"
      @dragover="deckDragOver($event)"
      @drop="deckDrop">
      <div class="deck">
        <div class="slot"
          v-for="(card, index) in state.currentDeck.cards"
          :key="card.data.id">
          <div class="slot-inner"
            :class="slotInnerClass(index)"
            @dragover="slotDragOver($event, index)"
            @dragleave="slotDragLeave"
            @drop="slotDrop($event, index)">
            <GeneralCard :general="card.data" :show-image="true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GeneralCard from './GeneralCard'
import store from '../store'

export default {
  name: 'Board',
  data () {
    return {
      state: store.state,
      currentSlotIndex: -1,
    }
  },
  components: {
    GeneralCard,
  },
  methods: {
    deckDragOver ($event) {
      $event.preventDefault()
      const { dataTransfer } = $event
      if (dataTransfer.dropEffect === 'none') {
        dataTransfer.dropEffect = 'copy'
      }
    },
    deckDrop ($event) {
      $event.stopPropagation()
      const { dataTransfer } = $event
      const id = dataTransfer.getData('text')
      const general = store.findGeneral(id)
      store.addCard('general', general)
    },
    slotDragOver ($event, index) {
      $event.preventDefault()
      const { dataTransfer } = $event
      dataTransfer.dropEffect = 'link'
      this.currentSlotIndex = index
    },
    slotDragLeave ($event) {
      const { dataTransfer } = $event
      if (dataTransfer.dropEffect === 'link') {
        dataTransfer.dropEffect = 'none'
      }
      this.currentSlotIndex = -1
    },
    slotDrop ($event, index) {
      $event.stopPropagation()
      const { dataTransfer } = $event
      const id = dataTransfer.getData('text')
      const general = store.findGeneral(id)
      store.replaceCard(index, 'general', general)
      this.currentSlotIndex = -1
    },
    slotInnerClass (index) {
      return {
        active: (index === this.currentSlotIndex),
      }
    },
  },
}
</script>

<style scoped>
.deck-container {
  background-color: #0daf79;
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.deck-container::-webkit-scrollbar {
  display: none;
}

.deck {
  display: flex;
  height: 189px;
}

.slot {
  background-color: #8a9491;
  width: 49px;
  min-width: 49px;
  height: 179px;
  margin: 5px;
  display: block;
}

.slot-inner {
  width: 49px;
  min-width: 49px;
  height: 179px;
}

.slot-inner.active {
  margin: -2px;
  border: solid 2px #fe6011;
}
</style>
