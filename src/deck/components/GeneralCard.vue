<template>
  <div class="general"
    :style="generalStyle"
    >
    <img
      class="thumbnail lozad"
      :data-src="general.thumbnail"
      v-show="showImage"
      alt=""
      draggable="false"
      />
    <div class="shadow">
    </div>
    <div class="name">
      <span class="rarity">{{general.rarity}}</span>{{general.name}}
    </div>
  </div>
</template>

<script>
import lazyload from '../utils/lazyload'

export default {
  name: 'GeneralCard',
  props: {
    general: {
      type: Object,
      required: true,
    },
    showImage: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    generalStyle () {
      let style = ''
      const { red, green, blue } = this.general.stateColor
      style += `background-color: rgba(${red}, ${green}, ${blue}, 1);`
      return style
    },
  },
  mounted () {
    lazyload.observe()
  },
}
</script>

<style scoped>
@import '../defines.css';

.general {
  position: relative;
  width: 49px;
  height: 179px;
  user-select: none;
}

.thumbnail {
  width: 49px;
  height: 179px;
  object-fit: cover;
}

.shadow {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.general .name {
  writing-mode: vertical-rl;
  position: absolute;
  right: 0;
  bottom: 5px;
  color: var(--general-name-color);
}

.general .name .rarity {
  -webkit-text-combine: horizontal;
  -ms-text-combine-horizontal: all;
  text-combine-upright: all;
}
</style>
