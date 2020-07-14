<template>
    <div class="card-inner">
        <div class="cover-inner"><img
                class="cover"
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594718685092&di=0db581b89fbc042ac27d8cf0efa4319c&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D1500313889%2C2589456976%26fm%3D214%26gp%3D0.jpg"
            ></div>
        <div class="actions-inner">
            <div class="title">
                <span>
                    <el-tag
                        type=''
                        plain
                        color="#fff"
                    >歌单</el-tag>
                </span>
                <span style="font-size:24px;font-weight:400">我喜欢的音乐</span>
            </div>
            <div class="user-infor">
                <span>
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </span>
                <span>Boyyys</span>
                <span class="date">2016-07-16创建</span>
            </div>
            <div class="btn-group">
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
                    style="margin-left:10px"
                >收藏</el-button>
                <el-button
                    size="mini"
                    type="plain"
                    icon="el-icon-share"
                >分享</el-button>
            </div>

        </div>
        <div class="data">
            <div>
                <div>歌曲数</div>
                <div>20000</div>
            </div>
            <el-divider direction="vertical"></el-divider>

            <div>
                <div>播放数</div>
                <div>3123123</div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.cover {
    height: 200px;
    width: 200px;
}
/deep/.el-button {
    padding-left: 10px;
    padding-right: 10px;
}
/deep/.el-tag {
    line-height: 24px;
    height: 24px;
}
.card-inner {
    > div {
        display: inline-block;
        vertical-align: top;
        .user-infor {
            margin: 12px;
            margin-left: 0;
            > * {
                font-size: 14px;
                vertical-align: middle;
            }
            .date {
                margin-left: 12px;
                font-size: 12px;
                color: #a1a1a1;
            }
        }
    }
    .actions-inner {
        padding-top: 10px;
        padding-left: 20px;
    }
    .title {
        > * {
            vertical-align: middle;
        }
    }

    .data {
        padding-top: 10px;
        position: absolute;
        right: 30px;
        > * {
            display: inline-block;
            vertical-align: middle;
            font-size: 12px;
            color: #a1a1a1;
        }
    }
}
/deep/.el-divider {
    height: 32px;
}
</style>

