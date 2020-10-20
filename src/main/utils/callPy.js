const exec = require('child_process').exec;

function callPython() {
  exec('python web.py', function (error, stdout, stderr) {
    if (error) {
      console.info('stderr : ' + stderr);
    }
    console.log('exec: ' + stdout);
  })
}
callPython()