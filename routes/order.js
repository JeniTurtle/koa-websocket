const router = require('koa-router')();
const models = require('../database/models');
const { allWebsocketSendMsg } = require('../common/functions');
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

router.all('/updateOrderStatus/:orderId/:orderType', async (ctx, next) => {
    const orderId = ctx.params['orderId'];
    const orderType = ctx.params['orderType'];

    if (orderType === "finished") {
        const Order = models['Order'];

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
                        message: "取餐码已失效"
                    }
                }));

                return ctx.renderJSON({
                    code: 2,
                    message: "取餐码已失效"
                })
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

            await ctx.renderJSON({
                code: 0,
                message: "订单状态修改成功"
            })
        })();
    } else {
        await ctx.renderJSON({
            code: 1,
            error: "无效的订单状态"
        })
    }
});

router.get('/listenOrder', async (ctx, next) => {
    ctx.state = {
        title: '取餐订单'
    };
    await ctx.render('order/listenOrder', {});
});

module.exports = router;
