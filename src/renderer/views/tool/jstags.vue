<template>
  <div class="jstags-container">
    <img :src="current.picture" style="height:300px;width:300px;" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'current'
      // ...
    ])
  }
}
</script>
<style lang="less" scoped>
.jstags-container {
  position: absolute;
  left: 201px;
  top: 50px;
}
</style>