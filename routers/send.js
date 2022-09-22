const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const router = new Router()
const porter = require('../utils/allPorts')
const listener = require('../utils/listener')

// 设置路由前缀
router.prefix('/send')

router.get('/', (ctx, next)=>{
  const page = fs.readFileSync(path.resolve(__dirname + '/../tmps/send.html'))
  ctx.type = 'html'
  ctx.body = page
})

router.post('/create', async (ctx) => {
  ctx.body = {
    code: 0,
    data: {
      port: porter.newPort()
    }
  }
})

router.post('/uploadFile/:port', (ctx) => {
  const { port } = ctx.params
  const result = listener.emit(`file_${port}`, JSON.parse(ctx.request.body))
  ctx.body = {
    code: result ? 0 : 400,
    data: {
      msg: result ? 'success' + port : '端口失效'
    }
  }
})

router.post('/clear', async (ctx) => {
  var reqData = {}
  try{
    reqData = JSON.parse(ctx.request.body)
  } catch {
    return ctx.body = {
      code: 400,
      msg: '数据格式错误，请联系管理员'
    }
  }
  const { port } = reqData
  listener.clear(`file_${port}`)
  porter.clear(port)
  return ctx.body = {
    code: 0,
    msg: 'success'
  }
})

module.exports = router