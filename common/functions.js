export const allWebsocketSendMsg = (app, msg) => {
    app = app || [];
    for (let index in app.websocketList) {
        app.websocketList[index].send(msg)
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
