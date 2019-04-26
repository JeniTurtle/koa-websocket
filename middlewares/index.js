const path = require('path');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser')();
const convert = require('koa-convert');
const serve = require('koa-static');

const renderJSON = require('./renderJson');
const log = require('./logger');

module.exports = (app) => {
    app.use(convert(bodyparser));
    app.use(convert(logger()));
    app.use(convert(serve(path.join(__dirname, '../public'))));
    app.use(renderJSON());
    app.use(log());
};