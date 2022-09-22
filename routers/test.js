const Router = require('koa-router')
const router = new Router()

// 设置路由前缀
router.prefix('/test')

router.get('/getInfo', (ctx, next)=>{
  ctx.body = {code: 0, msg: "this is koa book."}
})

module.exports = router