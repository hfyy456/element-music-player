<template>
    <div>
        <table class="playList">
            <tr>
                <th class="index"></th>
                <th class="index">操作</th>
                <th class="title">音乐标题</th>
                <th class="singer">歌手</th>
                <th class="album">专辑</th>
            </tr>
            <tr
                class="rows"
                v-for="(item, index) in list"
                :key="index"
                @dblclick="play(index,item)"
            >
                <td>{{index}}</td>
                <td></td>
                <td>{{item.title}}</td>
                <td>{{item.artist}}</td>
                <td>{{item.album}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    props: {
        list: Array,
    },
    methods: {
        play(index, item) {
            let current = {
                id: item.id,
                playList: 'local',
                url: item.url,
                title: item.title,
                album: item.album,
                artist: item.artist,
                status: 'play',
            }
            this.$store.dispatch('app/switchMusic', current)
        },
    },
}
</script>
<style lang="less" scoped>
th {
    padding: 0;
    line-height: 30px;
}
.playList {
    width: 823px;
    text-align: center;
    color: gray;
    height: 280px;
    overflow: scroll;
    overflow-x: hidden;
    display: inline-block;
    .index {
        font-size: 14px;
        width: 30px;
        border-left: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
        &:hover {
            background-color: #ebeef5;
        }
    }
    .singer {
        font-size: 14px;
        width: 200px;
        border-left: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
        &:hover {
            background-color: #ebeef5;
        }
    }
    .title {
        font-size: 14px;
        width: 200px;
        border-left: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
        &:hover {
            background-color: #ebeef5;
        }
    }
    .album {
        font-size: 14px;
        width: 200px;
        border-left: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
        &:hover {
            background-color: #ebeef5;
        }
    }
    .rows {
        font-size: 12px;
        border-bottom: 1px solid #ebeef5;
        &:hover {
            background-color: #ebeef5;
        }
    }
}
</style>