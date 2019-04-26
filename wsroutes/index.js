const route = require('koa-route');

const orderInfo = route.all('/orderInfo', ctx => {
    ctx.websocket.send('socket连接建立成功');

    ctx.websocket.on('message', message => {
        console.log(message);
    });
});

module.exports = {
    orderInfo
};
