<template>
  <div class="general"
    draggable="true"
    @dragstart="dragstart"
    >
    {{general.name}}
  </div>
</template>

<script>
export default {
  name: 'GeneralCard',
  props: {
    general: {
      type: Object,
      require: true,
    },
  },
  methods: {
    dragstart (e) {
      const { dataTransfer } = e
      dataTransfer.effectAllowed = 'link'
      dataTransfer.setData('text', JSON.stringify(this.general))
      console.log(dataTransfer)
    },
  },
}
</script>

<style scoped>
.general {
  background-color: blue;
  width: 100px;
  height: 100px;
  margin: 5px;
  display: block;
}
</style>
