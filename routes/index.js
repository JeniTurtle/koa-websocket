const router = require('koa-router')();

router.get('/', async function (ctx, next) {
  let windowCode = parseInt(ctx.query['windowCode']) || 1;

  await ctx.render('index', {
    title: `清泉食堂在线订单（${windowCode}号取餐口）`,
    windowCode: windowCode,
  });
});

module.exports = router;
