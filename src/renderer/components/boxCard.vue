<template>
    <div class="card-inner">
        <div class="cover-inner"><img
                class="cover"
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594718685092&di=0db581b89fbc042ac27d8cf0efa4319c&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D1500313889%2C2589456976%26fm%3D214%26gp%3D0.jpg"
            ></div>
        <div class="actions-inner">
            <div>
                <span>
                    <el-tag
                        type=''
                        plain
                        color="#fff"
                    >歌单</el-tag>
                </span>
                <span style="font-size:20px;font-weight:600">我喜欢的音乐</span>
            </div>
            <div>
                <span>avtar</span>
                <span>Boyyys</span>
                <span>2016-07-16创建</span>
            </div>
            <div>
                <el-button-group>
                    <el-button
                        size="mini"
                        type="primary"
                        icon="el-icon-video-play"
                    >播放全部</el-button>
                    <el-button
                        size="mini"
                        type="primary"
                        icon="el-icon-plus"
                    ></el-button>
                </el-button-group>
                <el-button
                    size="mini"
                    type="plain"
                    icon="el-icon-folder-add"
                >收藏</el-button>
                <el-button
                    size="mini"
                    type="plain"
                    icon="el-icon-share"
                >分享</el-button>
            </div>

        </div>
        <div>
            <div style="display:inline-block">
                <div>歌曲数</div>
                <div>歌曲数</div>
            </div>
            <div style="display:inline-block">
                <div>歌曲数</div>
                <div>歌曲数</div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.cover {
    height: 200px;
    width: 200px;
}
.card-inner {
    > div {
        display: inline-block;
        vertical-align: middle;
    }
}
</style>

