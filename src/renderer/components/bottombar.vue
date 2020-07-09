<template>
  <div>
    <footer>
      <div class="audio-box">
      <span class="controller">
      <span>
        <i class="player-widget-s iconfont icon-shangyiqu"  @click="last()"></i>
      </span>
      <span>
      <i v-if="!audioStatus.playing" class="player-widget el-icon-caret-right"  @click="play()"></i>
      <i v-else class="player-widget iconfont icon-bofangqi-zanting" @click="play()"></i>
      </span>
      <span>
        <i class="player-widget-s iconfont icon-xiayiqu"  @click="next()"></i>
      </span>
      <span>
          <span class="time-a">{{this.transTime(this.audioStatus.currentTime)}}</span>
          <el-slider  v-model="percent" class="time-slider"></el-slider>
          <span class="time-b">{{this.transTime(this.audioStatus.duration)}}</span>
      </span>
      <span class="volume">
          <span class="volume-a">
            <i v-if="volume === 0" class="iconfont icon-mn_shengyinwu_fill"></i>
            <i v-else class="iconfont icon-mn_shengyin_fill"  @click="silence()"></i>
          </span>
          <el-slider  v-model="volume" class="volume-slider" @change="volumeChange()"></el-slider>
      </span>
      </span>
      <el-card class="box-card">
        <span class='informations'>
        <el-avatar shape="square" src="http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20181206/db4da6974f4247b6bc825bb53fb41ea4.jpeg"></el-avatar>
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
      <div class="add-menu closed">
        <span class="add-btn add-file">
          <svg viewBox="0 0 18 18">
            <path
              d="M13 14c0 2.21-1.79 4-4 4s-4-1.79-4-4V3c0-1.66 1.34-3 3-3s3 1.34 3 3v9c0 1.1-.9 2-2 2s-2-.9-2-2V4h1v8c0 .55.45 1 1 1s1-.45 1-1V3c0-1.1-.9-2-2-2s-2 .9-2 2v11c0 1.66 1.34 3 3 3s3-1.34 3-3V4h1v10z"
            />
          </svg>
        </span>
        <span class="add-btn add-list">
          <svg viewBox="0 0 24 24">
            <path
              d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"
            />
          </svg>
        </span>
        <span class="add-btn open-close">
          <svg viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </span>
        <span class="add-btn add-recording">
          <svg viewBox="0 0 24 24">
            <path
              d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
            />
          </svg>
        </span>
        <span class="add-btn add-note">
          <svg viewBox="0 0 24 24">
            <path
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
            />
          </svg>
        </span>
      </div>

      <span class="footer-right">
        <span>
          <svg viewBox="0 0 24 24">
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
        </span>
        <span>
          <svg viewBox="0 0 18 18">
            <path
              d="M9 5.5c.83 0 1.5-.67 1.5-1.5S9.83 2.5 9 2.5 7.5 3.17 7.5 4 8.17 5.5 9 5.5zm0 2c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S9.83 7.5 9 7.5zm0 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"
            />
          </svg>
        </span>
      </span>

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
      handler () {
        this.$refs.audio.src = this.current.url
        if (this.current.status === 'play') {
          this.$nextTick(() => {
            this.$refs.audio.load();
            this.$refs.audio.play();
          })
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'localList',
      'current'
      // ...
    ])
  },
  data () {
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
        loop: 'nomal'
      }
    }
  },
  mounted () {
    this.initAudio()
  },

  methods: {
    silence () {
      this.volume = 0
      this.$refs.audio.volume = this.volume / 100
    },
    volumeChange () {
      this.$refs.audio.volume = this.volume / 100
    },
    transTime (time) {
      let duration = parseInt(time)
      let minute = parseInt(duration / 60)
      let sec = duration % 60 + ''
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
    updateTime () {
      this.currentTime = this.$refs.audio.currentTime
      this.percent = this.audioStatus.currentTime / this.audioStatus.duration * 100
    },
    play () {
      if (!this.current.url) {
        return this.next()
      }
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    next () {
      const index = this.current.id + 1;
      let current = {}
      if (index >= this.localList.length) {
        current = this.localList[0]
      } else {
        current = this.localList[index]
      }
      current['playList'] = 'local'
      current['status'] = 'play'
      this.$store.dispatch('app/switchMusic', current);
    },
    last () {
      const index = this.music.id - 1;
      const length = this.localList.length
      let current = {}
      if (index < 0) {
        current = this.localList[length - 1]
      } else {
        current = this.localList[index]
      }
      current['playList'] = 'local'
      current['status'] = 'play'
      this.$store.dispatch('app/switchMusic', current);
    },
    initAudio () {
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
    }
  }
}
</script>
<style lang="less" scoped>
.audio-box{
  display: inline;
  vertical-align: middle;
}
.box-card{
  position: absolute;
  width: 20%;
  left:0px;
  top:-50px;
  height: 50px;
  .informations{
    position: relative;
    top:5px;
    .tt{
      display: inline-block;
      position: relative;
      top:-7px;
      left:2px;
      .title{
        font-size: 12px;
      }
      .author{
        color:gray;
        font-size: 12px;
      }
    }

  }
}
.controller{
  position: relative;
  left:20px;
  .time-slider{
    display: inline-block;
    width: 30%;
    position: relative;
    left:30px;
    top:5px;
  }
  .volume{
    position: relative;
    left:20px;
    .volume-a{
      cursor: pointer;
      font-size: 20px;
      position: relative;
      left:23px;
      top:-8px;
      color:white;
    }
    .volume-slider{
     display: inline-block;
    width: 10%;
    position: relative;
    left:30px;
    top:5px;
  }
  }
  .time-a{
    color: white;
    position: relative;
    left:20px;
    top:-9px;
  }
  .time-b{
    color: white;
    position: relative;
    left:32px;
    top:-9px;
  }
  .player-widget{
  border:2px solid white;
  color:white;
  font-size: 34px;
  border-radius: 50%;
  margin-left: 8px;
  margin-right: 8px;
  background-color: #409EFF;
  cursor: pointer;
  &:focus{
     background-color: #43B1FF;
  }
  &:hover{
     background-color: #43B1FF;
  }
}
.player-widget-s{
    position: relative;
    top:-6px;
    border:2px solid white;
    padding:4px;
    color:white;
    font-size: 21px;
    border-radius: 50%;
    background-color: #409EFF;
  cursor: pointer;
  &:focus{
     background-color: #43B1FF;
  }
  &:hover{
     background-color: #43B1FF;
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
  padding: 1.2em 0.7em;
  user-select: none;
}

.closed ~ .footer-bg::after {
  width: 70px;
}

.footer-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}
.footer-bg::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 0px;
  transform: translate(-50%, -85%);
  border-radius: 50px;
  width: 240px;
  height: 155px;
  box-shadow: 0px 0px 0px 2000px #409EFF;
  transition: width 0.3s;
}

.add-menu {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -70%);
  background-color: #409EFF;
  width: 200px;
  height: 50px;
  border-radius: 99999px;
  transition: width 0.3s;
  z-index:999;
}

footer svg {
  width: 30px;
  cursor: pointer;
  fill: white;
}

.closed .add-btn:not(.open-close) {
  transform-origin: top left;
  transform: scale(0) translate(-50%, -50%);
}

.closed .open-close {
  transform: translate(-50%, -50%) rotate(0deg);
}

.add-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transition: 0.3s;
}

.add-file {
  transform: scale(1) translate(-300%, -50%);
}

.add-list {
  transform: scale(1) translate(-175%, -50%);
}

.open-close {
  transform: translate(-50%, -50%) rotate(45deg);
}

.add-recording {
  transform: scale(1) translate(75%, -50%);
}

.add-note {
  transform: scale(1) translate(200%, -50%);
}

.add-menu.closed {
  width: 50px;
}

.footer-right {
  float: right;
}
</style>