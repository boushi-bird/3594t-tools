<template>
  <div class="pure-menu">
    <a href="./" class="pure-menu-heading">デッキ</a>
    <ul class="pure-menu-list">
      <li class="pure-menu-item pure-menu-selected"><a class="pure-menu-link">テスト1</a></li>
      <li class="pure-menu-item"><a class="pure-menu-link">テスト2</a></li>
      <li class="pure-menu-item"><a class="pure-menu-link">テスト3</a></li>
      <li class="pure-menu-item pure-menu-disabled"><a class="pure-menu-link">テスト4</a></li>
      <li class="pure-menu-item"><a class="pure-menu-link">テスト5</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Menu',
}
</script>

<style lang="stylus" scoped>
a.pure-menu-heading
  font-size: 125%
  color: #adcec3
  cursor: pointer

a.pure-menu-link
  color: #adcec3
  cursor: pointer

.pure-menu li a:hover,
.pure-menu li a:focus
  background-color: #157656

// .container a
//   color: #999
//   border: none
//   padding: 0.6em 0 0.6em 0.6em
//   cursor: pointer
//
// .container .pure-menu,
// .container .pure-menu ul
//   border: none
//   background: transparent
//
// .container .pure-menu ul,
// .container .pure-menu .menu-item-divided
//   border-top: 1px solid #333
//
// .container .pure-menu li a:hover,
// .container .pure-menu li a:focus
//   background: #157656
//
// .container .pure-menu-selected,
// .container .pure-menu-heading
//   background: #157656
//
// .container .pure-menu-selected a
//   color: #fff
//
// .container .pure-menu-heading
//   font-size: 110%
//   color: #fff
//   margin: 0
</style>
