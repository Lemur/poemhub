const proc = require('child_process')
proc.exec('java -jar thulac\\thulac.jar ' +
  '-seg_only -input data\\docs\\WuYan.txt -output data\\docs\\Separate_WuYan.txt',
  (error, stdout, stderr) => {
    if (error) {
      console.log(error)
    }
    if (stdout) {
      console.log(stdout)
    }
    if (stderr) {
      console.log(stderr)
    }
  }
)
