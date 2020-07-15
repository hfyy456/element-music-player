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
                const length = this.lrc.length
                for (var i = 0; i < length; i++) {
                    if (this.lrc[i].seconds == second) {
                        this.word = this.lrc[i].content
                    }
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