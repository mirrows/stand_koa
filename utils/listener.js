// class Listeners {
//   listeners = {}
//   curId = 0
//   on(sign, cb) {
//     // 添加监听
//     if (this.listeners[sign]) {
//       this.listeners[sign].line.push({id: this.curId, fn: cb})
//     } else {
//       this.listeners[sign] = {
//         sign,
//         line: [{id: this.curId, fn: cb}],
//       }
//     }
//     return this.curId++
//   }
//   async emit(sign, ...args) {
//     // 触发监听
//     if(!this.listeners[sign]) return false
//     for(let i = 0; i < this.listeners[sign].line.length; i++) {
//       const a = await this.listeners[sign].line[i].fn(...args)
//     }
//     return true
//   }
//   clear(sign, id) {
//     if(!this.listeners[sign]) return
//     if(id) {
//       const ind = this.listeners[sign].line.findIndex(cb => cb.id === id)
//       this.listeners[sign].line.splice(ind, 1)
//     } else {
//       console.log(`clear listener ${sign} ${id || ''}`)
//       delete this.listeners[sign]
//     }
//   }

  
// }


const Listeners = {
  listeners: {},
  curId: 0,
  on(sign, cb) {
    // 添加监听
    if (this.listeners[sign]) {
      this.listeners[sign].line.push({id: this.curId, fn: cb})
    } else {
      this.listeners[sign] = {
        sign,
        line: [{id: this.curId, fn: cb}],
      }
    }
    return this.curId++
  },
  async emit(sign, ...args) {
    // 触发监听
    if(!this.listeners[sign]) return false
    for(let i = 0; i < this.listeners[sign].line.length; i++) {
      const a = await this.listeners[sign].line[i].fn(...args)
    }
    return true
  },
  clear(sign, id) {
    if(!this.listeners[sign]) return
    if(id) {
      const ind = this.listeners[sign].line.findIndex(cb => cb.id === id)
      this.listeners[sign].line.splice(ind, 1)
    } else {
      console.log(`clear listener ${sign} ${id || ''}`)
      delete this.listeners[sign]
    }
  }
}

module.exports = Listeners