import 'babel-polyfill'
import 'purecss'
import 'purecss/build/menus.css'
import 'whatwg-fetch'
import './utils/dnd-polyfill'
import './deck.css'
import Vue from 'vue'
import App from './App'
import store from './store'

new Vue({
  el: '#app',
  components: {
    App,
  },
  template: '<App />',
})

store.loadBaseData()
