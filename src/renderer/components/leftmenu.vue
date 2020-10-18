<template>
  <div class="left-container">
    <div class="trees">
      <el-tree
        :data="playList"
        style="padding-top:20px;"
        :default-expand-all="playExpand"
        @node-click="handleNodeClick"
      ></el-tree>

      <el-tree
        :data="preferList"
        style="padding-top:20px;"
        :default-expand-all="preferExpand"
        @node-click="handleNodeClick"
      ></el-tree>

      <el-tree
        :data="tools"
        style="padding-top:20px;"
        :default-expand-all="toolsExpand"
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      playList: [
        {
          label: '我的音乐',
          children: [
            {
              label: '本地音乐',
              value: 'local'
            },
            {
              label: '下载管理',
              value: 'likes'
            },
            {
              label: '我的音乐云盘',
              value: 'likes'
            },
            {
              label: '我的收藏',
              value: 'likes'
            }
          ]
        }
      ],
      preferList: [
        {
          label: '创建的歌单',
          children: [
            {
              label: '我喜欢的音乐',
              value: 'likes'
            }
          ]
        }
      ],
      tools: [
        {
          label: '工具',
          children: [
            {
              label: 'JsTags',
              value: 'jstags'
            }
          ]
        }
      ],

      playExpand: true,
      toolsExpand: true,
      preferExpand: true,
      recommendList: [
        {
          label: '推荐',
          children: [
            {
              label: '发现音乐',
              value: 'find'
            },
            {
              label: '私人Fm',
              value: 'private'
            },
            {
              label: 'LOOK直播',
              value: 'look'
            },
            {
              label: '视频',
              value: 'video'
            },
            {
              label: '朋友',
              value: 'friend'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(this.$route.path)
      let url = '/' + data.value
      console.log(data.value)
      this.$router.push({ path: url })
    }
  }
}
</script>
<style lang="less" scoped>
.left-container {
  margin: 0;
  background-color: #f6f6f8;
  height: 86.2vh;
  width: 200px;
  border-right: 1px solid #e4e7ed;
  .trees {
    padding-top: 5px;
    background-color: #f6f6f8;
  }
}
/deep/.el-tree {
  background-color: #f6f6f8;
}
/deep/.el-tree-node__label {
  color: #5c5c5c;
  &:hover {
    color: #000;
  }
}
/deep/ .el-tree-node__content {
  padding-left: 0 !important;
  padding-top: 5px;
  font-size: 12px;
}
/deep/ .el-tree-node__label {
  font-size: 12px;
}
</style>