<template>
    <div>
        <div>
            <input
                class="input"
                placeholder="搜索音乐、视频，歌词，电台"
                @focus="handleFocus"
                @blur="handleBlur"
            >
        </div>
        <div
            class="triangle"
            v-show="display"
        ></div>
        <div
            class="hot-box"
            v-show="display"
        >
            <div class='hot-inner'>
                <div class="title">热搜榜</div>
                <div class="items">
                    <span class="rank">1</span>
                    <div class="information">
                        <div><span class='name'>官方问答</span><span class='hot'>100822</span></div>
                        <div><span class='desc'>sdasddasd</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            display: false,
        }
    },
    methods: {
        handleFocus() {
            this.display = true
        },
        handleBlur() {
            this.display = false
        },
    },
}
</script>
<style lang="less" scoped>
.input {
    width: 200px;
    border-radius: 120px;
    min-height: 20px;
    border: none;
    padding-left: 10px;
    line-height: 20px;
    color: #ffffff;
    background-color: #9b0909;
    &:focus {
        outline: none;
    }
}
input::-webkit-input-placeholder {
    color: #a1a1a1;
}
.hot-box {
    position: absolute;
    top: 36px;
    z-index: 9999;
    height: 500px;
    width: 400px;
    background-color: #ffffff;
    box-shadow: 1px 1px 1px 1px #cccccc;
    .hot-inner {
        padding-top: 15px;
        font-weight: 300;
    }
    .title {
        padding-left: 15px;

        margin-bottom: 10px;
        vertical-align: middle;
    }
    .items {
        padding-left: 15px;
        padding-top: 5px;
        padding-bottom: 5px;
        cursor: pointer;
        &:hover {
            background-color: #f5f5f5;
        }
    }
    .information {
        display: inline-block;
        vertical-align: middle;
        margin-left: 20px;

        .name {
            font-size: 14px;
            font-weight: 700;
            padding-right: 10px;
        }
        .hot {
            font-size: 12px;
            color: #a1a1a1;
        }
        .desc {
            font-size: 14px;
            color: #a1a1a1;
        }
    }
}
.triangle {
    position: absolute;
    width: 0;
    height: 0;
    left: 15px;
    top: 15px;
    border: 12px solid transparent; //所有border都是透明的，
    border-bottom-color: #ffffff;
}
</style>