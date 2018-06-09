<template>
  <div
    id="app"
    :class="{ active: sideMenuActive }">
    <a id="toggle-menu" class="hamburger" @click="toggleMenu">
      <span></span>
    </a>
    <div id="side-menu">
      <Menu />
    </div>
    <div id="main" @click="closeMenu">
      <Board />
      <SearchGenerals />
    </div>
  </div>
</template>

<script>
import Menu from '../deck/components/Menu'
import Board from './components/Board'
import SearchGenerals from './components/SearchGenerals'
import store from './store'

export default {
  name: 'App',
  components: {
    Menu,
    Board,
    SearchGenerals,
  },
  data () {
    return {
      state: store.state,
      sideMenuActive: false,
    }
  },
  methods: {
    toggleMenu () {
      this.sideMenuActive = !this.sideMenuActive
    },
    closeMenu () {
      this.sideMenuActive = false
    },
  },
}
</script>

<style scoped>
#app {
  position: relative;
  left: 0;
  padding-left: 0;
}

#app.active #toggle-menu {
  left: 150px;
}

#side-menu {
  margin-left: -150px;
  width: 150px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  color: #777;
  background-color: #13372b;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

#app.active #side-menu {
  left: 150px;
  width: 150px;
}

#toggle-menu {
  display: block;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10;
}

#app, #side-menu, #toggle-menu {
  transition: all 0.2s ease-out;
}

#main {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

@media (min-width: 640px) {
  #app {
    padding-left: 150px;
    left: 0;
  }

  #side-menu {
    left: 150px;
  }

  #toggle-menu {
    position: fixed;
    left: 150px;
    display: none;
  }

  #app.active #toggle-menu {
    left: 150px;
  }

  #main {
    width: calc(100% - 150px);
  }
}

@media (max-width: 640px) {
  #app.active {
    position: relative;
    left: 150px;
  }

  #app.active #main {
    width: calc(100% - 150px);
  }
}
</style>
