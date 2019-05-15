const router = require('koa-router')();
var md5 = require('md5-node');
const models = require('../database/models');
const { websocketSend, parsePostData } = require('../common/functions');
const { WebsocketDataType } = require('../common/constants');

const websocketSendMessage = (ctx, message, orderId, windowCode) => {
    const data = {
        type: WebsocketDataType.ORDER_STATUS,
        data: {
            message: message
        }
    };
    websocketSend(ctx, data, orderId, windowCode);
};

const websocketSendData = (ctx, sendData, orderId, windowCode) => {
    const data = {
        type: WebsocketDataType.ORDER_INFO,
        data: sendData,
    };
    websocketSend(ctx, data, orderId, windowCode);
};


router.all('/getOrderInfo/:orderId', async (ctx, next) => {
    const orderId = ctx.params['orderId'];
    var user = await models['Order'].findOne({
        where: {
            id: orderId
        }
    });
    await ctx.renderJSON(user.dataValues)
});

router.all('/updateOrderStatus/:windowCode/:verifyCode', async (ctx, next) => {
    const windowCode = ctx.params['windowCode'];
    const verifyCode = ctx.params['verifyCode'];
    const Order = models['Order'];
    const data = await parsePostData(ctx);

    if (verifyCode !== md5('jouryu123456')) {
        return ctx.body = "code=0001";
    }

    if (!data.vgdecoderesult) {
        return ctx.body = "code=0002";
    }

    const orderId = parseInt(data.vgdecoderesult);

    const updateRet = await Order.update({
        status: 61
    }, {
        where:{
            id: orderId
        }
    });

    await (async () => {
        if (updateRet[0] != 1) {
            await websocketSendMessage(ctx, "无效的取餐码", orderId, windowCode);
            return ctx.body = "code=0003";
        }
        const orderInfo = await Order.findOne({
            where: { id: orderId }
        });
        const orderProducts = await orderInfo.getOrderProducts();
        const userInfo = await orderInfo.getStaff();
        await websocketSendData(ctx, {
            orderInfo,
            userInfo,
            orderProducts
        }, orderId, windowCode);

        return ctx.body = "code=0000";
    })();
});

router.get('/listenOrder', async (ctx, next) => {
    ctx.state = {
        title: '取餐订单'
    };
    await ctx.render('order/listenOrder', {});
});

module.exports = router;
