<template>
  <div class="table">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>你好</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div>
        <Playlist :list="localList" />
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Playlist } from '@/components'
export default {
  components: {
    Playlist
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'localList'
      // ...
    ])
  },
  methods: {
    getLocal () {

    }
  }
}
</script>
<style lang="less" scoped>
.table {
  z-index: 999;
  position: absolute;
  left: 200px;
  top: 50px;
  width: 823px;
  .clearfix{
    height:245px;
  }
}

</style>