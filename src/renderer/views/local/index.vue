<template>
    <div class="table">
        <el-card class="box-card">
            <div
                slot="header"
                class="clearfix"
            >
                <boxCard />
            </div>
            <div>
                <Playlist :list="localList" />
            </div>
        </el-card>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Playlist, BoxCard } from '@/components'
export default {
    components: {
        Playlist,
        BoxCard,
    },
    data() {
        return {}
    },
    computed: {
        ...mapGetters([
            'localList',
            // ...
        ]),
    },
    methods: {
        getLocal() {},
    },
}
</script>
<style lang="less" scoped>
.table {
    z-index: 999;
    position: absolute;
    left: 200px;
    top: 50px;
    width: 823px;
    .clearfix {
        height: 245px;
    }
}
</style>