<template>
  <div class="board">
    <div class="deck-info">
      コスト: {{state.currentDeck.cost}} /  {{state.deckConstraints.maxNumberOfCost}}
      枚数: {{state.currentDeck.cards.length}} /  {{state.deckConstraints.maxNumberOfCards}}
    </div>
    <div class="deck-drop-area"
      :class="deckDropAreaClass()"
      @touchmove="disablePullScroll"
      @dragover="deckDragOver($event)"
      @drop="deckDrop">
      <transition-group
        name="deck-animation"
        class="deck">
        <div class="slot"
          v-for="(card, index) in state.currentDeck.cards"
          :key="card.data.id">
          <div class="slot-inner"
            :class="slotInnerClass(index)"
            draggable="true"
            @dragstart="slotDragStart($event, card.data)"
            @dragend="slotDragEnd"
            @dragover="slotDragOver($event, index)"
            @dragleave="slotDragLeave"
            @drop="slotDrop($event, index)">
            <GeneralCard
              :general="card.data"
              :show-image="true"
              v-show="dragging !== card.data"
              />
          </div>
        </div>
      </transition-group>
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
      dragging: null,
    }
  },
  components: {
    GeneralCard,
  },
  methods: {
    deckDragOver ($event) {
      $event.preventDefault()
      const { dataTransfer } = $event
      if (dataTransfer.dropEffect === 'link') {
        return
      }
      if (store.isAddable()) {
        dataTransfer.dropEffect = 'copy'
      } else {
        dataTransfer.dropEffect = 'none'
      }
    },
    deckDrop ($event) {
      $event.stopPropagation()
      const { dataTransfer } = $event
      const id = dataTransfer.getData('text')
      const general = store.findGeneral(id)
      store.addCard('general', general)
    },
    slotDragStart ($event, general) {
      const { dataTransfer } = $event
      dataTransfer.effectAllowed = 'linkMove'
      dataTransfer.setData('text', general.id)
      this.dragging = general
    },
    slotDragEnd ($event) {
      this.dragging = null
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
    disablePullScroll ($event) {
      // iOS Chromeで pull to refleshが走るのを防止
      $event.preventDefault()
    },
    deckDropAreaClass () {
      return {
        invalid: (this.state.currentDeck.constraintViolations.length > 0),
      }
    },
    slotInnerClass (index) {
      return {
        active: (index === this.currentSlotIndex),
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.board
  background-color: #19c88e

.deck-info
  text-align: right

.deck-drop-area
  background-color: #0daf79
  white-space: nowrap
  overflow-x: auto
  -webkit-overflow-scrolling: touch

.deck-drop-area.invalid
  background-color: #323534

.deck-drop-area::-webkit-scrollbar
  display: none

.deck
  display: flex
  height: 189px

.slot
  width: 49px
  min-width: 49px
  height: 179px
  margin: 5px
  transition: all 0.5s
  display: block

.slot-inner
  width: 49px
  min-width: 49px
  height: 179px

.slot-inner.active
  margin: -2px
  border: solid 2px #fe6011

.deck-animation-enter,
.deck-animation-leave-to
  opacity: 0

.deck-animation-leave-active
  position: absolute
  display: none
</style>
