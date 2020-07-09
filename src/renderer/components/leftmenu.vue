<template>
  <div class="left-container">
    <div class="trees">
   <el-tree :data="data" :default-expand-all="expand"  @node-click="handleNodeClick"></el-tree>
  </div></div>
</template>
<script>
  export default {
    data () {
      return {
        data: [{
          label: '我的播放列表',
          children: [{
            label: '本地音乐',
            value: 'local'
          },
          {
            label: '我喜欢的音乐',
            value: 'likes'
          }
          ]
        }],
        expand: true
      }
    },
    methods: {
      handleNodeClick (data) {
        console.log(this.$route.path)
        let url = '/' + data.value
        console.log(data.value)
        this.$router.push({path: url})
      }
    }
  }
</script>
<style lang="less" scoped>
.left-container{
  margin: 0;
  background-color: #fff;
  height: 86.2vh;
  width: 20%;
  box-shadow: 1px 1px 1px 1px #c2c2c2;
  .trees{
    padding-top: 40px;
  }
}
</style>