var router = require('koa-router')();

router.all('/receiveCode', function (ctx, next) {
  console.log(ctx.params)
  ctx.body = "code=0000";
});

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: '标题'
  };

  await ctx.render('index', {

  });
});

module.exports = router;
