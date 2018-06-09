import { polyfill } from 'mobile-drag-drop'
import { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour'
import 'mobile-drag-drop/default.css'
// import 'mobile-drag-drop/icons.css'

const result = polyfill({
  holdToDrag: 250,
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
})

if (result) {
  global.document.addEventListener('dragenter', (e) => {
    e.preventDefault()
  })
  global.document.addEventListener('dragstart', (e) => {
    if (!e.isTrusted) {
      return
    }
    e.stopPropagation()
  }, true)
}
