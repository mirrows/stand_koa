

class PortControl {
  curPort = 5221
  ports = {}
  setPort(port, data) {
    this.ports[port] = {...data, port, timeStamp: Date.now()}
  }
  getPort(port) {
    return this.ports[port]
  }
  newPort(data = {}) {
    const port = this.curPort++
    this.setPort(port, data)
    console.log(this.ports)
    return port
  }
  clear(port) {
    delete this.ports[port]
  }
}

module.exports = new PortControl()