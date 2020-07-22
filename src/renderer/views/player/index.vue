<template>
    <div class="player-container">
        <div class="cover-container">
            <img
                :src='current.picture'
                style="height:300px;width:300px;"
            >
            <div class="btn-group">
                <el-button
                    type="plain"
                    icon="el-icon-star-off"
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
        <div class="right-container">
            <div style="padding-bottom:10px"><span class="title">{{current.title}}</span>
            </div>
            <div><span class="desc">专辑：{{current.album}}</span><span
                    class="desc"
                    style="margin-left:40px;"
                >歌手：{{current.artist}}</span></div>
            <div
                class="lrc-box"
                style="padding-top: 10px;"
            >
                <lrcBox />
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import lrcBox from '@/components/lrcBox'
const { ipcRenderer } = require('electron')

export default {
    components: {
        lrcBox,
    },
    computed: {
        ...mapGetters([
            'current',
            // ...
        ]),
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
    left: 201px;
    top: 50px;
    background-color: #fafafa;
    width: 823px;
    display: flex;
    justify-content: space-around;
    height: 558px;
}
.right-container {
    padding-top: 20px;
    .title {
        font-size: 24px;
    }
    .desc {
        color: #333333;
        font-weight: 400;
        font-size: 14px;
    }
}
.cover-container {
    padding-top: 60px;
}
.btn-group {
    margin-top: 20px;
    width: 300px;
    display: flex;
    justify-content: space-between;
    * {
        font-size: 20px;
    }
}
/deep/.el-button {
}
</style>