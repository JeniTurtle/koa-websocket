export const websocketSend = (ctx, data, orderId) => {
    const socketList = ctx.app.websocketList;

    for (let index in socketList.orderInfo) {
        socketList.orderInfo[index].send(JSON.stringify(data))
    }

    if (!orderId) {
        return null;
    }

    for (let index in socketList.orderStatus[orderId]) {
        socketList.orderStatus[orderId][index].send(JSON.stringify(data))
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
