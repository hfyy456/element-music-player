<template>
    <div>
        <el-button
            class="open"
            type="text"
            v-show="!display"
            @click="handle"
            style="font-size:25px;padding:0"
            icon="el-icon-arrow-down
"
        ></el-button>
        <ul
            class="top"
            v-show="display"
        >
            <li style="left:25px">
                <span class="logo">网易云音乐</span>
            </li>
            <li style="left:300px">
                <searchInput />
            </li>
            <li style="right:25px;">
                <el-button
                    type="text"
                    @click="minsize"
                    class="close"
                    icon="el-icon-remove"
                ></el-button>
            </li>
            <li style="right:100px;">
                <div
                    class="user-infor"
                    @click="openLoginWindow"
                >
                    <span>
                        <el-avatar
                            size="small"
                            icon="el-icon-user-solid"
                        ></el-avatar>
                    </span>
                    <span>未登录</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
            </li>
            <li style="right:0;">
                <el-button
                    type="text"
                    @click="close"
                    class="close"
                    icon="el-icon-error"
                ></el-button>
            </li>
            <li style="right:50px;">
                <el-button
                    type="text"
                    @click="handle"
                    class="close"
                    icon="el-icon-arrow-up"
                ></el-button>
            </li>
        </ul>
    </div>
</template>
<script>
import searchInput from './searchInput'
const { ipcRenderer: ipc } = require('electron')
export default {
    data() {
        return {
            display: true,
        }
    },
    components: {
        searchInput,
    },
    methods: {
        close() {
            console.log('close')
            ipc.send('close')
        },
        minsize() {
            ipc.send('minsize')
        },
        handle() {
            this.display ? (this.display = false) : (this.display = true)
        },
        openLoginWindow() {
            ipc.send('openLoginWindow')
        },
    },
}
</script>
<style lang="less" scoped>
.open {
    position: absolute;
    top: 0;
    right: 0;
}
@keyframes fadenum {
    /*设置内容由显示变为隐藏*/

    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
.user-infor {
    margin: 12px;
    margin-left: 0;
    > * {
        color: #e4e7ed;
        font-size: 14px;
        vertical-align: middle;
    }
    &:hover {
        > * {
            cursor: pointer;
            color: white;
        }
    }
}
.top {
    width: 100vw;
    background-color: #c62f2f;
    z-index: 999;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    min-height: 50px;
    animation: fadenum 1s linear;
    .close {
        font-size: 25px;
        padding: 0;
        color: #e4e7ed;
        &:hover {
            color: white;
        }
    }
    &:hover {
        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.05);
    }
    li {
        opacity: 1;
        position: absolute;
        float: left;
    }
    .logo {
        letter-spacing: 2px;
        color: #ffffff;
    }
}
</style>