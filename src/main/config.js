const fs = require('fs')
const path = require('path')
const jsmediatags = require('jsmediatags')
class Config {
  constructor() {
    this.path = path.join('./userData', 'config.json')
    this.config = JSON.parse(fs.readFileSync(this.path))
    this.readLocal()
  }
  get(key) {
    return this.config[key]
  }
  set(key, value) {
    this.config[key] = value
    return this.config[key]
  }
  sortbyKey(arr, key) {
    if (arr.length > 0) {
      return arr.sort((a, b) => {
        let x = a[key]
        let y = b[key]
        return x - y
      })
    }
  }
  readLocal() {
    const getTags = (url) => new Promise((resolve, reject) => {
      jsmediatags.read(url, {
        onSuccess: (tag) => {
          resolve(tag);
        },
        onError: (error) => {
          reject(error);
        }
      })
    })
    let files = fs.readdirSync('./music')
    var playList = []
    let length = files.length
    let index = 0
    for (let i = 0; i < length; i++) {
      let filename = files[i]
      let extname = path.extname(filename)
      if (extname === '.flac' || extname === '.mp3' || extname === '.ape') {
        let url = 'music/' + filename
        getTags(url).then(res => {
          let tags = res['tags']
          let item = { 'id': index++, 'url': url }
          item['title'] = tags['title']
          item['artist'] = tags['artist']
          item['album'] = tags['album']
          item['picture'] = tags['picture']
          playList.push(item)
          this.config['localList'] = playList
        })
      }
    }
    console.log('here')
  }
}
export default new Config()
