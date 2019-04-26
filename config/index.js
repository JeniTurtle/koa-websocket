var db = require('./config');

//根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象
module.exports = {
    development: db.development,
    test: db.test,
    production:db.production
}[process.env.NODE_ENV || 'development']