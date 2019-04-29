const router = require('koa-router')();
const { parsePostData } = require('../common/functions');

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: '标题'
  };

  await ctx.render('index', {

  });
});

module.exports = router;
