import 'purecss'
import 'purecss/build/grids-responsive.css'
import './deck.css'
import Vue from 'vue'
import App from './App'

const app = new Vue({
  el: '#app',
  components: {
    App,
  },
  template: '<App />',
})

console.log(app)

const generals = document.querySelectorAll('div[draggable=true].general')
generals.forEach((general) => {
  general.addEventListener('dragstart', (e) => {
    // const { dataTransfer } = e
    console.log(e)
  })
})
