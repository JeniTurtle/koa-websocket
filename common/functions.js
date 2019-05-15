export const websocketSend = (ctx, data, orderId, windowCode) => {
    const socketList = ctx.app.websocketList;

    for (let index in socketList.orderInfo[windowCode]) {
        try {
            socketList.orderInfo[windowCode][index].send(JSON.stringify(data))
        } catch (e) {
            // 如果连接失效的话,删除对象
            delete socketList.orderInfo[windowCode][index];
        }
    }

    if (!orderId) {
        return null;
    }

    for (let index in socketList.orderStatus[orderId]) {
        try {
            socketList.orderStatus[orderId][index].send(JSON.stringify(data))
        } catch (e) {
            // 如果连接失效的话,删除对象
            delete socketList.orderStatus[orderId][index];
        }
    }
};

// 解析上下文里node原生请求的POST参数
export const parsePostData = ctx => {
    return new Promise((resolve, reject) => {
        try {
            let postdata = "";
            ctx.req.addListener('data', (data) => {
                postdata += data
            });
            ctx.req.addListener("end",function(){
                resolve(parseQueryStr(postdata));
            })
        } catch ( err ) {
            reject(err)
        }
    })
};

// 将POST请求参数字符串解析成JSON
export const parseQueryStr = queryStr => {
    let queryData = {};
    let queryStrList = queryStr.split('&&');
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=');
        queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
    }
    return queryData
};
