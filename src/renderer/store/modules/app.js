const { ipcRenderer } = require('electron')
const state = {
  currentPlaylist: '',
  username: '',
  localList: '',
  current: ''
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
  }
}
const actions = {
  getConfig ({ commit }) {
    return new Promise(resolve => {
      ipcRenderer.send('config')
      ipcRenderer.on('config-reply', (event, arg) => {
        const { settings, localList } = arg
        console.log(settings)
        commit('SET_USERNAME', settings['username'])
        commit('SET_LOCALLIST', localList)
        console.log(typeof localList)
        resolve(arg)
        // mark
      })
    })
  },
  switchMusic ({ commit }, current) {
    return new Promise(resolve => {
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
