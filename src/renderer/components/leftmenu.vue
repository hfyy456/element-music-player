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
  background-color: #f6f6f8;
  height: 86.2vh;
  width: 200px;
  border-right:1px solid #E4E7ED;
  .trees{
    background-color: #f6f6f8;
    padding-top: 50px;
  }
}
/deep/.el-tree{
    background-color: #f6f6f8;

}
</style>