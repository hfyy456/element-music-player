const { ipcRenderer } = require('electron')
const state = {
  currentPlaylist: '',
  username: '',
  localList: '',
  current: '',
  currentTime: 2,
  lrc: '',
}
const mutations = {
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_CURRENTPLAYLIST: (state, currentPlaylist) => {
    state.currentPlaylist = currentPlaylist
  },
  SET_LOCALLIST: (state, localList) => {
    state.localList = localList
  },
  SET_CURRENT: (state, current) => {
    state.current = current
  },
  SET_LRC: (state, lrc) => {
    state.lrc = lrc
  },
  SET_CURRENTTIME(state, currentTime) {
    state.currentTime = currentTime
  },
}
const actions = {
  getConfig({ commit }) {
    return new Promise(resolve => {
      ipcRenderer.send('config')
      ipcRenderer.on('config-reply', (event, arg) => {
        const { settings, localList } = arg
        console.log(settings)
        commit('SET_USERNAME', settings['username'])
        commit('SET_LOCALLIST', localList)
        // console.log(typeof localList)
        resolve(arg)
        // mark
      })
    })
  },
  updateTime({ commit }, currentTime) {
    commit('SET_CURRENTTIME', currentTime)
  },
  getLrc({ commit }) {
    return new Promise(resolve => {
      ipcRenderer.send('lrc')
      ipcRenderer.on('lrc-reply', (event, arg) => {
        commit('SET_LRC', arg)
        resolve(arg)
      })
    })

  },
  switchMusic({ commit }, current) {
    return new Promise(resolve => {
      function getPicture(picture, callback) {
        if (!picture) {
          return
        }
        const imgData = picture.data
        let base64String = ''
        for (let i = 0; i < imgData.length; i++) {
          base64String += String.fromCharCode(imgData[i])
        }
        callback(
          null,
          `data:${picture.format};base64,${window.btoa(base64String)}`
        )
      }
      // console.log(current.picture)

      getPicture(current.picture, (e, url) => {
        current.picture = url
      })
      commit('SET_CURRENT', current)
      resolve()
      // mar
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
