export const allWebsocketSendMsg = (app, msg) => {
    app = app || [];
    for (let index in app.websocketList) {
        app.websocketList[index].send(msg)
    }
};
