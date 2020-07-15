<template>
    <div class="player-container">
        <div style="display:inline-block">
            <img style="height:200px;width:200px; vertical-align:middle">
            <div class="btn-group">
                <el-button
                    type="plain"
                    icon="el-icon-star-off"
                    style="margin-left:10px"
                    circle
                ></el-button>
                <el-button
                    type="plain"
                    icon="el-icon-share"
                    circle
                ></el-button>
                <el-button
                    type="plain"
                    icon="el-icon-delete"
                    circle
                ></el-button>
                <el-button
                    type="plain"
                    icon="el-icon-more"
                    circle
                ></el-button>
            </div>
        </div>
        <div style="display:inline-block;vertical-align:middle">
            <div><span>同桌的你</span>
            </div>
            <div><span>专辑</span><span>歌手</span></div>
            <div class="lrc-box">
                <lrcBox />
            </div>
        </div>
    </div>
</template>
<script>
import lrcBox from '@/components/lrcBox'
const { ipcRenderer } = require('electron')

export default {
    components: {
        lrcBox,
    },
    mounted() {
        this.initLrc()
    },
    methods: {
        initLrc() {
            this.$store.dispatch('app/getLrc')
        },
    },
}
</script>
<style lang="less" scoped>
.player-container {
    z-index: 999;
    position: absolute;
    left: 200px;
    top: 50px;
    background-color: #fafafa;
    width: 823px;
}
/deep/.el-button {
}
</style>