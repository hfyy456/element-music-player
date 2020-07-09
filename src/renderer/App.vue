<template>
  <div id="app">
    <Topmenu />
    <Leftmenu />
    <div>
    <router-view></router-view>
    </div>
    <Bottombar />
  </div>
</template>

<script>
import { Topmenu, Bottombar, Leftmenu } from '@/components'
export default {
  name: 'elc',
  components: {
    Topmenu,
    Bottombar,
    Leftmenu
  },
  created () {
    this.$store.dispatch('app/getConfig')
  }
}
</script>

<style>
/* CSS */
body{
  margin: 0;
}
.uk-notification-message {
    font-size: 14px;
    text-align: center;
}
::-webkit-scrollbar {
  width: 7px;
  background-color: #afafaf;
}
::-webkit-scrollbar-thumb {
  background-color: #636363;
}
.el-slider__bar{
  background-color:#ffffff!important;
}
.el-slider__button{
  width: 12px !important;
  height: 12px !important;
  border: 2px solid #409EFF!important;
}
.el-card__body{
  padding:0!important;
}
</style>
