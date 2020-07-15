const getters = {
  username: state => state.app.username,
  localList: state => state.app.localList,
  current: state => state.app.current,
  lrc: state => state.app.lrc,
  currentTime: state => state.app.currentTime
}
export default getters
