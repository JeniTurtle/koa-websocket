module.exports = () => {
    const renderJSON = ctx => (json) => {
        ctx.set("Content-Type", "application/json");
        ctx.body = JSON.stringify(json)
    };
    return async (ctx, next) => {
        ctx.renderJSON = renderJSON(ctx);
        await next()
    }
};
