<template>
  <div id="app">
    <div id="board-container">
      <Board></Board>
    </div>
    <div id="main-container">
      <div class="cards">
        <GeneralCard
          v-for="(general, index) in state.generals"
          :key="index"
          :general="general">
        </GeneralCard>
      </div>
    </div>
  </div>
</template>

<script>
import Board from './components/Board'
import GeneralCard from './components/GeneralCard'
import store from './store'

export default {
  name: 'App',
  components: {
    Board,
    GeneralCard,
  },
  data () {
    return {
      state: store.state,
    }
  },
}
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

#board-container {
  background-color: white;
  width: 100%;
  height: 200px;
}

#main-container {
  overflow-y: auto;
}

.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
