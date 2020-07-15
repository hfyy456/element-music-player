<template>
    <div class="lrc-container">
        <div>{{word}}</div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    watch: {
        currentTime: {
            handler() {
                const second = parseInt(this.currentTime)
                if (this.lrc[second]) {
                    this.word = this.lrc[second]
                }
            },
        },
    },
    computed: {
        ...mapGetters([
            'lrc',
            'currentTime',
            // ...
        ]),
    },
    data() {
        return {
            word: '',
        }
    },
    mounted() {
        console.log(this.currentTime)
    },
    methods: {},
}
</script>
<style lang="less" scoped>
.lrc-container {
    height: 400px;
    width: 300px;
    background-color: #ffffff;
}
</style>