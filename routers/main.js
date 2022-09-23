const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const router = new Router()

router.get('/', (ctx, next)=>{
  const page = fs.readFileSync(path.resolve(__dirname + '/../tmps/index.html'))
  ctx.type = 'html'
  ctx.body = page
})

router.get('/msg', (ctx, next)=>{
  ctx.body = {code: 0, msg: "this is koa MSG."}
})

module.exports = router