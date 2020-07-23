'use strict'
import { app, BrowserWindow } from 'electron'
import config from './config'
import lrcReader from './utils/lrcReader'
const ms = require('mediaserver')
const http = require('http')
const path = require('path')
const fs = require('fs')
const { ipcMain } = require('electron')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

ms.mediaTypes['.flac'] = 'audio/flac'
const allowKeys = []
// collect audio's extname
Object.keys(ms.mediaTypes).forEach(ext => {
  if (ms.mediaTypes[ext].indexOf('audio') === 0) {
    allowKeys.push(ext)
  }
})
config.readLocal()
function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 667,
    useContentSize: true,
    width: 1024,
    //frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  startMusicServer(port => {
    mainWindow.loadURL(winURL);
  })

  mainWindow.on('closed', () => {
    mainWindow = null;
  })
}
function startMusicServer(callback) {
  const server = http.createServer(pipeMusic).listen(0, () => {
    callback(server.address().port)
  })

  return server
}
function pipeMusic(req, res) {
  const musicUrl = decodeURIComponent(req.url)
  const extname = path.extname(musicUrl)
  if (allowKeys.indexOf(extname) < 0) {
    return notFound(res)
  }
  const fileUrl = path.join(
    musicUrl.substring(1)
  )
  if (!fs.existsSync(fileUrl)) {
    return notFound(res)
  }

  ms.pipe(req, res, fileUrl)
}
function notFound(res) {
  res.writeHead(404)
  res.end('not found')
}
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
ipcMain.on('close', function () {
  console.log('hello')
  mainWindow.close()
})
ipcMain.on('minsize', function () {
  console.log('hello')
  mainWindow.minimize()
})
ipcMain.on('openLoginWindow', function () {
  let newwin = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    parent: mainWindow, //win是主窗口
  })
  newwin.loadURL(path.join('file:', __dirname, 'index.html')); //new.html是新开窗口的渲染进程
  newwin.on('closed', () => { newwin = null })
})
ipcMain.on('config', (event, arg) => {
  let obj = config['config']
  obj['localList'] = config.sortbyKey(obj['localList'], 'id')
  console.log(obj)
  event.sender.send('config-reply', obj)
})
ipcMain.on('lrc', (event, arg) => {
  lrcReader().then(res => {
    //console.log(res)
    event.sender.send('lrc-reply', res)
  })

})
ipcMain.on('current', (event, arg) => {
  let current = config['config']['current']
  event.sender.send('current-reply', current)
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
