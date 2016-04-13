const proc = require('child_process')

proc.exec('java -jar thulac/thulac.jar ' +
  '-input data/word/QiYan_withoutTitle.txt -output data/word/Separate_QiYan.txt',
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
