const Koa = require('koa');
const koa = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const onerror = require('koa-onerror');
const websockify = require('koa-websocket');

const middleware = require('./middlewares');
const index = require('./routes/index');
const order = require('./routes/order');
const ws_router = require('./wsroutes/index');

const app = websockify(new Koa());

// 定义全局对象,缓存socket连接
app.websocketList = {
  orderStatus: {},
  orderInfo: {},
};

middleware(app);

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

router.use(index.routes(), index.allowedMethods());
router.use('/order', order.routes(), order.allowedMethods());
app.use(router.routes(), router.allowedMethods());
app.ws.use(ws_router.routes(), ws_router.allowedMethods());

module.exports = app;