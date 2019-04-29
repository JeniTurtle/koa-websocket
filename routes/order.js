const router = require('koa-router')();
var md5 = require('md5-node');
const models = require('../database/models');
const { allWebsocketSendMsg, parsePostData } = require('../common/functions');
const { WebsocketDataType } = require('../common/constants');

router.all('/getOrderInfo/:orderId', async (ctx, next) => {
    const orderId = ctx.params['orderId'];
    var user = await models['Order'].findOne({
        where: {
            id: orderId
        }
    });
    await ctx.renderJSON(user.dataValues)
});

router.all('/updateOrderStatus/:verifyCode', async (ctx, next) => {
    const verifyCode = ctx.params['verifyCode'];
    const Order = models['Order'];
    const data = await parsePostData(ctx);

    if (verifyCode !== md5('jouryu123456')) {
        return ctx.body = "code=0001";
    }

    if (!data.vgdecoderesult) {
        await allWebsocketSendMsg(ctx.app, JSON.stringify({
            type: WebsocketDataType.ORDER_STATUS,
            data: {
                message: "扫码设备存在异常"
            }
        }));
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
            await allWebsocketSendMsg(ctx.app, JSON.stringify({
                type: WebsocketDataType.ORDER_STATUS,
                data: {
                    message: "无效的取餐码"
                }
            }));
            return ctx.body = "code=0003";
        }
        const orderInfo = await Order.findOne({
            where: { id: orderId }
        });
        const orderProducts = await orderInfo.getOrderProducts();
        const userInfo = await orderInfo.getStaff();

        await allWebsocketSendMsg(ctx.app, JSON.stringify({
            type: WebsocketDataType.ORDER_INFO,
            data: {
                orderInfo,
                userInfo,
                orderProducts
            }
        }));

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
