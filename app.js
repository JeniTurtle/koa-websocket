const Koa = require('koa');
const koa = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const onerror = require('koa-onerror');
const websockify = require('koa-websocket');
const UUID = require('uuid');

const middleware = require('./middlewares');
const index = require('./routes/index');
const order = require('./routes/order');
const ws_index = require('./wsroutes/index');

const app = websockify(new Koa());
app.websocketList = {};

middleware(app);

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

app.ws.use((ctx, next) => {
  const key = UUID.v1();
  // 把socket连接对象放到全局对象中
  app.websocketList[key] = ctx.websocket;
  // 连接关闭后,从全局对象中删除
  ctx.websocket.on('close', () => {
    delete app.websocketList[key]
  });

  return next();
});

app.ws.use(ws_index.orderInfo);

router.use(index.routes(), index.allowedMethods());
router.use('/order', order.routes(), order.allowedMethods());
app.use(router.routes(), router.allowedMethods());

module.exports = app;