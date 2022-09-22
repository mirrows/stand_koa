const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const router = new Router()
const { PassThrough } = require("stream")
const listener = require('../utils/listener')
const porter = require('../utils/allPorts')

// 设置路由前缀
router.prefix('/receive')

router.get('/', (ctx, next)=>{
  const page = fs.readFileSync(path.resolve(__dirname + '/../tmps/receive.html'))
  ctx.type = 'html'
  ctx.body = page
})

router.post('/enter', (ctx) => {
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
  console.log(porter)
  ctx.body = {
    code: 0,
    data: porter.getPort(port) || null
  }
})

router.get('/file/:port', (ctx) => {
  const { port } = ctx.params

  ctx.request.socket.setTimeout(0);
  ctx.req.socket.setNoDelay(true);
  ctx.req.socket.setKeepAlive(true);

  ctx.type = 'text/event-stream; charset=utf-8';
  ctx.set('Cache-Control', 'no-cache');
  ctx.set('Connection', 'keep-alive');

  const stream = new PassThrough();

  ctx.status = 200;
  ctx.body = stream

  const id = listener.on(`file_${port}`, (data) => {
    try{
      const result = JSON.stringify(data)
      stream.write(`data: ${result}\n\n`)
    } catch{
      console.log(`file_${port}error: 数据错误请检查`)
    }
  })
  // if the connection closes or errors,
  // we stop the SSE.
  stream.on("close", () => {
    console.log(`close port ${port}`)
    listener.clear(`file_${port}`, id)
    // clearInterval(interval);
  });
})



module.exports = router