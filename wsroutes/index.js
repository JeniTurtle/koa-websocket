const router = require('koa-router')();
const UUID = require('uuid');

// 餐厅人员查看所有取餐扫码信息
router.all('/orderInfo', ctx => {

    ctx.websocket.send('socket连接建立成功');
    const key = UUID.v1();

    // 把socket连接对象放到全局对象中
    ctx.app.websocketList.orderInfo[key] = ctx.websocket;
    // 连接关闭后,从全局对象中删除
    ctx.websocket.on('close', () => {
        delete ctx.app.websocketList[key]
    });

    ctx.websocket.on('message', message => {
        console.log(message);
    });
});

// 订餐人员查看当前订餐扫码状态
router.all('/orderStatus/:orderId', ctx => {
    ctx.websocket.send('socket连接建立成功');

    const key = UUID.v1();
    const orderId = ctx.params['orderId'];
    const socketList = ctx.app.websocketList.orderStatus;

    if (!socketList[orderId]) {
        socketList[orderId] = {};
    }
    // 把socket连接对象放到全局对象中
    socketList[orderId][key] = ctx.websocket;
    // 连接关闭后,从全局对象中删除
    ctx.websocket.on('close', () => {
        delete socketList[orderId][key];
    });

    ctx.websocket.on('message', message => {
        console.log(message);
    });
});

module.exports = router;
