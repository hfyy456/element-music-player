const fs = require('fs')
const path = require('path')
export default async function lrcReader() {
    const val = '许巍 - 旅行'
    let files = fs.readdirSync('./music/lrc')
    console.log(files)
    if (!files) {
        return
    }
    let match = null
    let length = files.length
    for (let i = 0; i < length; i++) {
        let filename = files[i]
        let name = path.basename(filename)
        let arr = name.split('.')
        name = arr[0]
        if (name === val) {
            match = filename
            break
        }
    }
    if (!match) {
        return
    }
    let url = 'music/lrc/' + match
    const res = await readFiles(url)
    const data = res.split('[')
    const reg = /([0-9]\d):([0-5]\d)/
    let lrc = []
    for (let i = 0; i < data.length; i++) {
        data[i] = "[" + data[i]
        data[i] = data[i].replace(/\r\n\r\n/, '')
        data[i] = data[i].replace(/\r\n/, '')
        if (reg.test(data[i])) {
            let arr = data[i].split(']')
            let timeStringArr = arr[0].split('[')
            let timeString = timeStringArr[1]
            let time = timeString.split(':')
            //console.log(time)
            let second = time[0] * 1 * 60 + time[1] * 1
            let seconds = parseInt(second)
            lrc.push({ seconds: seconds, content: arr[1] })
        }
    }
    //console.log(lrc)
    return lrc
}
function readFiles(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
