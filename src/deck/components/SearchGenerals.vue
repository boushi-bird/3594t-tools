<template>
  <div
    class="search-generals"
    @dragover="cardDragOver($event)"
    @drop="cardDrop"
    >
    <transition-group
      name="search-generals"
      class="cards">
      <div
        class="card"
        v-for="general in searchedGenerals"
        :key="general.id"
        >
        <div
          class="draggable-card"
          :draggable="state.showDeck"
          @dragstart="cardDragStart($event, general)"
          @dragend="cardDragEnd"
          >
          <GeneralCard
            :general="general"
            :show-image="false"
            v-show="dragging !== general"
            />
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import GeneralCard from './GeneralCard'
import store from '../store'

export default {
  name: 'SearchGenerals',
  components: {
    GeneralCard,
  },
  data () {
    return {
      state: store.state,
      dragging: null,
    }
  },
  computed: {
    searchedGenerals () {
      return this.state.generals
        .filter((general) => {
          const { cards } = this.state.currentDeck
          if (!this.state.showDeck) {
            return cards
          }
          return !cards.some(({ type, data }) => {
            return general === data
          })
        })
    },
  },
  methods: {
    cardDragStart ($event, general) {
      const { dataTransfer } = $event
      dataTransfer.effectAllowed = 'copyLink'
      dataTransfer.setData('text', general.id)
      this.dragging = general
    },
    cardDragEnd ($event) {
      this.dragging = null
    },
    cardDragOver ($event) {
      $event.preventDefault()
      const { dataTransfer } = $event
      dataTransfer.dropEffect = 'move'
    },
    cardDrop ($event) {
      $event.stopPropagation()
      const { dataTransfer } = $event
      const id = dataTransfer.getData('text')
      const general = store.findGeneral(id)
      if (general) {
        store.removeCard('general', general)
      }
    },
  },
}
</script>

<style scoped>
.search-generals {
  overflow-y: auto;
}

.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.card {
  transition: all 0.5s;
  display: block;
}

.draggable-card {
  width: 49px;
  min-width: 49px;
  height: 179px;
  margin: 5px;
}

.search-generals-enter {
  opacity: 0;
}

.search-generals-leave-active {
  position: absolute;
}
</style>
