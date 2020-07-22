<template>
    <div
        class="lrc-container"
        ref='box'
    >
        <div>
            <div
                v-for="(item) of lrc"
                ref="item"
                class="lrc-text"
                :key="item.seconds"
            >
                {{item.content}}
            </div>
        </div>
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
                        this.$refs.item[i - 1].style.color = 'black'
                        this.$refs.item[i].style.color = 'red'
                        const position = this.$refs.box.scrollTop
                        this.$refs.box.scrollTop = position + 2
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
    height: 350px;
    width: 400px;
    margin-bottom: 10px;
    background-color: #fafafa;
    overflow: auto;
    .lrc-text {
        color: #242424;
        line-height: 24px;
        font-weight: 300;
        font-size: 15px;
        letter-spacing: 0.2em;
    }
}
</style>