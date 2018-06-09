<template>
  <div id="app">
    <div id="board-container">
      <Board />
    </div>
    <div id="main-container">
      <SearchGenerals />
    </div>
  </div>
</template>

<script>
import Board from './components/Board'
import SearchGenerals from './components/SearchGenerals'
import store from './store'

export default {
  name: 'App',
  components: {
    Board,
    SearchGenerals,
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
  background-color: #19c88e;
  width: 100%;
  /* height: 366px; */
}

#main-container {
  overflow-y: auto;
}
</style>
