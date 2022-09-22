const Koa = require('koa')
const registerRouter = require('../routers')
const koaBody = require('koa-body')
const port = require('../utils/port')
const static = require('koa-static')


const KoaApp = {
  config: {
    port: 8858,
    app: new Koa()
  },
  createApp({ port } = this.config) {
    const { app } = this.config
    app.use(koaBody())
    app.use(static(__dirname + '/static'))

    app.use(async (ctx, next) => {
      next()
    })

    app.use(registerRouter())

    app.listen(port, () => {
      console.log('serve runs at http://localhost:' + port)
    })
    return app
  },
  async init() {
    // this.config.port = await port(this.config.port)
    this.createApp(this.config)
  }
}

module.exports = KoaApp