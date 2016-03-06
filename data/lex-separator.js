/**
 * 用于生成中间文件'sep_by_lex.txt'
 */
const proc = require('child_process')
proc.exec('java -jar thulac\\thulac.jar ' +
  '-input data\\docs\\high-frequency-word.csv -output data\\docs\\sep_by_lex.txt',
  (err, stdout, stderr) => {
    if (err) {
      console.log(err)
    }
    if (stdout) {
      console.log(stdout)
    }
    if (stderr) {
      console.log(stderr)
    }
  })
