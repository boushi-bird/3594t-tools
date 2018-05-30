<template>
  <div>
    <h2>デッキ</h2>
    <div class="deck-container">
      <div class="deck">
        <div class="slot" v-for="n in state.deckConstraints.maxNumberOfCards" :key="n">
          <div class="slot-inner" @dragover="dragOver" @drop="drop">
            {{n}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store'

export default {
  name: 'Board',
  data () {
    return {
      state: store.state,
    }
  },
  methods: {
    dragOver (e) {
      e.preventDefault()
      const { dataTransfer } = e
      // if (dataTransfer.getData('text') === 'general') {
      // }
      dataTransfer.dropEffect = 'link'
      console.log(dataTransfer.getData('text'))
      // console.log('dropOver', dataTransfer)
    },
    drop (e) {
      e.preventDefault()
      const { dataTransfer } = e
      console.log(dataTransfer.getData('text'))
    },
  },
}
</script>

<style scoped>
.deck-container {
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
}

.slot {
  background-color: skyblue;
  width: 105px;
  height: 105px;
  margin: 5px;
  display: block;
}

.slot-inner {
  background-color: yellow;
  width: 100px;
  height: 100px;
}
</style>
