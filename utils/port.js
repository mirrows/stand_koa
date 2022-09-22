// const portFinder = require('portfinder');
const { exec } = require('child_process')
const readline = require('readline')
const os = require('os')

// const patton = `
//         _            _      _          _        _        _
//        /\\ \\         / /\\   /\\ \\    _ / /\\      /\\ \\     /\\ \\
//       /  \\ \\____   / /  \\  \\ \\ \\  /_/ / /      \\ \\ \\   /  \\ \\____
//      / /\\ \\_____\\ / / /\\ \\  \\ \\ \\ \\___\\/       /\\ \\_\\ / /\\ \\_____\\
//     / / /\\/___  // / /\\ \\ \\ / / /  \\ \\ \\      / /\\/_// / /\\/___  /
//    / / /   / / // / /  \\ \\ \\\\ \\ \\   \\_\\ \\    / / /  / / /   / / /
//   / / /   / / // / /___/ /\\ \\\\ \\ \\  / / /   / / /  / / /   / / /
//  / / /   / / // / /_____/ /\\ \\\\ \\ \\/ / /   / / /  / / /   / / /
//  \\ \\ \\__/ / // /_________/\\ \\ \\\\ \\ \\/ /___/ / /__ \\ \\ \\__/ / /
//   \\ \\___\\/ // / /_       __\\ \\_\\\\ \\  //\\__\\/_/___\\ \\ \\___\\/ /
//    \\/_____/ \\_\\___\\     /____/_/ \\_\\/ \\/_________/  \\/_____/
// `

const commend = (os, commend, sign) => ({
  Darwin: {
    portFinder: `lsof -i:${sign}`
  },
  Windows_NT: {
    portFinder: `netstat -aon | findstr "${sign}"`
  },
  Linux: {
    portFinder: `netstat -anp | grep ${sign}`
  }
}[os][commend])

const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return new Promise(resolve => rl.question(query, ans => {
    rl.close()
    resolve(ans)
  }))
}

const findPort = (port) => {
  const curPort = (port) => new Promise((resolve, reject) => {
    exec(commend(os.type(), 'portFinder', port), async (err, stdout, stderr) => {
      if (err) {
        return resolve(port)
      }
      port++
      port = await curPort(port)
      return resolve(port)
    })
  })
  return curPort(port)
}

module.exports = findPort

// module.exports = function (basePort) {
//   return new Promise((resolve, reject) => {
//     portFinder.basePort = basePort;
//     portFinder.getPort((err, port) => {
//       if(err) {
//         reject(err)
//       } else {
//         resolve(port)
//       }
//     })
//   })
// }
