<template>
    <div>
        <footer>
            <div class="audio-box">
                <span class="controller">
                    <span>
                        <i
                            class="player-widget-s iconfont icon-shangyiqu"
                            @click="last()"
                        ></i>
                    </span>
                    <span>
                        <i
                            v-if="!audioStatus.playing"
                            class="player-widget el-icon-caret-right"
                            @click="play()"
                        ></i>
                        <i
                            v-else
                            class="player-widget iconfont icon-bofangqi-zanting"
                            @click="play()"
                        ></i>
                    </span>
                    <span>
                        <i
                            class="player-widget-s iconfont icon-xiayiqu"
                            @click="next()"
                        ></i>
                    </span>
                    <span>
                        <span class="time-a">{{this.transTime(this.audioStatus.currentTime)}}</span>
                        <el-slider
                            v-model="percent"
                            class="time-slider"
                        ></el-slider>
                        <span class="time-b">{{this.transTime(this.audioStatus.duration)}}</span>
                    </span>
                    <span class="volume">
                        <span class="volume-a">
                            <i
                                v-if="volume === 0"
                                class="iconfont icon-mn_shengyinwu_fill"
                            ></i>
                            <i
                                v-else
                                class="iconfont icon-mn_shengyin_fill"
                                @click="silence()"
                            ></i>
                        </span>
                        <el-slider
                            v-model="volume"
                            class="volume-slider"
                            @change="volumeChange()"
                        ></el-slider>
                    </span>
                </span>
                <el-card class="box-card">
                    <span class='informations'>
                        <el-avatar
                            shape="square"
                            src="http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20181206/db4da6974f4247b6bc825bb53fb41ea4.jpeg"
                        ></el-avatar>
                        <div class="tt">
                            <div class="title">{{this.current.title}}</div>
                            <div class="author">{{this.current.artist}}</div>
                        </div>
                    </span>
                </el-card>
                <audio
                    ref="audio"
                    crossorigin="anonymous"
                    preload
                    @timeupdate="updateTime()"
                    src="default"
                ></audio>
            </div>
            <div class="footer-bg"></div>
        </footer>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
const AC = new window.AudioContext()
const analyser = AC.createAnalyser()
const gainnode = AC.createGain()
const { ipcRenderer } = require('electron')
gainnode.gain.value = 1
export default {
    watch: {
        current: {
            handler() {
                this.$refs.audio.src = this.current.url
                if (this.current.status === 'play') {
                    this.$nextTick(() => {
                        this.$refs.audio.load()
                        this.$refs.audio.play()
                    })
                }
            },
        },
    },
    computed: {
        ...mapGetters([
            'username',
            'localList',
            'current',
            // ...
        ]),
    },
    data() {
        return {
            isPlay: false,
            percent: null,
            volume: 100,
            audioSource: null,
            bufferSource: null,
            audioStatus: {
                currentTime: 0,
                duration: 0,
                playing: false,
                muted: false,
                loop: 'nomal',
            },
        }
    },
    mounted() {
        this.initAudio()
    },

    methods: {
        silence() {
            this.volume = 0
            this.$refs.audio.volume = this.volume / 100
        },
        volumeChange() {
            this.$refs.audio.volume = this.volume / 100
        },
        transTime(time) {
            let duration = parseInt(time)
            let minute = parseInt(duration / 60)
            let sec = (duration % 60) + ''
            let isM0 = ':'
            if (minute === 0) {
                minute = '00'
            } else if (minute < 10) {
                minute = '0' + minute
            }
            if (sec.length === 1) {
                sec = '0' + sec
            }
            return minute + isM0 + sec
        },
        updateTime() {
            this.currentTime = this.$refs.audio.currentTime
            this.percent =
                (this.audioStatus.currentTime / this.audioStatus.duration) * 100
        },
        play() {
            if (!this.current.url) {
                return this.next()
            }
            if (this.$refs.audio.paused) {
                this.$refs.audio.play()
            } else {
                this.$refs.audio.pause()
            }
        },
        next() {
            const index = this.current.id + 1
            let current = {}
            if (index >= this.localList.length) {
                current = this.localList[0]
            } else {
                current = this.localList[index]
            }
            current['playList'] = 'local'
            current['status'] = 'play'
            this.$store.dispatch('app/switchMusic', current)
        },
        last() {
            const index = this.music.id - 1
            const length = this.localList.length
            let current = {}
            if (index < 0) {
                current = this.localList[length - 1]
            } else {
                current = this.localList[index]
            }
            current['playList'] = 'local'
            current['status'] = 'play'
            this.$store.dispatch('app/switchMusic', current)
        },
        initAudio() {
            // connect audio to the destination
            ipcRenderer.send('current')
            ipcRenderer.on('current-reply', (event, arg) => {
                this.$store.dispatch('app/switchMusic', arg)
                // mark
            })
            const audio = this.$refs.audio
            const source = AC.createMediaElementSource(this.$refs.audio)
            source.connect(analyser)
            analyser.connect(gainnode)
            gainnode.connect(AC.destination)
            let endTimeout
            const onEnd = () => {
                clearTimeout(endTimeout)
                if (this.audioStatus.loop === 'nomal') {
                    this.next()
                }
            }
            audio.onended = () => {
                onEnd()
            }
            audio.ontimeupdate = () => {
                clearTimeout(endTimeout)
                this.audioStatus.currentTime = audio.currentTime
                const lessTime =
                    this.audioStatus.duration - this.audioStatus.currentTime
                // end event would not be fired while currentTime changed
                // so use timeout to fire end event.
                if (this.audioStatus.duration && lessTime < 5) {
                    endTimeout = setTimeout(() => {
                        onEnd()
                    }, lessTime * 1000 + 100)
                }
            }

            audio.oncanplay = () => {
                this.audioStatus.duration = audio.duration
            }

            audio.onplaying = () => {
                this.audioStatus.playing = true
            }

            audio.onpause = () => {
                clearTimeout(endTimeout)
                this.audioStatus.playing = false
            }
        },
    },
}
</script>
<style lang="less" scoped>
.audio-box {
    display: inline;
    vertical-align: middle;
}
.box-card {
    position: absolute;
    width: 201px;
    left: 0px;
    top: -60px;
    background-color: #f6f6f8;
    height: 60px;
    .informations {
        position: relative;
        top: 5px;
        .tt {
            display: inline-block;
            position: relative;
            top: -7px;
            left: 2px;
            .title {
                font-size: 12px;
            }
            .author {
                color: gray;
                font-size: 12px;
            }
        }
    }
}
.controller {
    position: relative;
    left: 20px;
    .time-slider {
        display: inline-block;
        width: 30%;
        position: relative;
        left: 30px;
        top: 5px;
    }
    .volume {
        position: relative;
        left: 20px;
        .volume-a {
            cursor: pointer;
            font-size: 20px;
            position: relative;
            left: 23px;
            top: -8px;
            color: #666666;
        }
        .volume-slider {
            display: inline-block;
            width: 10%;
            position: relative;
            left: 30px;
            top: 5px;
        }
    }
    .time-a {
        color: #000;
        position: relative;
        font-size: 14px;
        left: 20px;
        top: -9px;
    }
    .time-b {
        font-size: 14px;
        color: #000;
        position: relative;
        left: 32px;
        top: -9px;
    }
    .player-widget {
        border: 2px solid #f6f6f8;
        color: white;
        font-size: 34px;
        border-radius: 50%;
        margin-left: 8px;
        margin-right: 8px;
        background-color: #e83c3c;
        cursor: pointer;
        &:focus {
            background-color: #c20c0c;
        }
        &:hover {
            background-color: #c20c0c;
        }
    }
    .player-widget-s {
        position: relative;
        top: -6px;
        border: 2px solid #f6f6f8;
        padding: 4px;
        color: white;
        font-size: 21px;
        border-radius: 50%;
        background-color: #e83c3c;
        cursor: pointer;
        &:focus {
            background-color: #c20c0c;
        }
        &:hover {
            background-color: #c20c0c;
        }
    }
}
* {
    box-sizing: border-box;
}

p {
    font-size: 2em;
    padding-left: 1em;
}

svg {
    width: 1em;
}

footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0.2em 0.3em;
    user-select: none;
}

.footer-bg {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #f6f6f8;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-top: 1px solid #e4e7ed;
    z-index: -1;
}
</style>