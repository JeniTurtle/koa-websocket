# SocketIO

## 业务介绍

- 用户扫码调用api接口,修改订单状态,并把订单信息发送给所有websocket客户端
- (注1:http接口和websocket没有加权限验证,因为就只能改个订单状态和获取订单信息,懒得加权限验证了)
- (注2:正常情况是需要加入消息队列,websocket客户端发送指令,不断消费订单信息,但是因为就一个用户用,所以这里一切从简,只缓存所有socket客户端连接,直接发送消息,就是这么简单粗暴)


## Running Start

```
npm install
npm start
```

open in browser

http://127.0.0.1:3000/ 

## 启动方式

最简单启动方式

```
node bin/run
```

最常用的集成nodemon的方式,代码变动会自动重载(其实就是nodemon去执行bin/run)

```
npm start
```

支持pm2部署

```
 #npm run pm2
 pm2 start bin/run 
```
## 支持koa2的3种中间件写法

Koa 2是一个 middleware framework, 它提供了 3 种不同类型的中间件写法

- common function
- async function（新增）
- generatorFunction

详见[koa 2的文档](https://github.com/koajs/koa/blob/v2.x/Readme.md)

## 支持view层多种模板


`koa-views` is using [consolidate](https://github.com/tj/consolidate.js) under the hood.

[List of supported engines](https://github.com/tj/consolidate.js#supported-template-engines)


需要注意的koa2使用的koa-views也是下一版本的koa-views@next，当前项目已经处理过了，不需要再处理的，哈哈


### jade 

```
npm i -S jade
```

in app.js

```
app.use(views(__dirname + '/views', {
  extension: 'jade'
}));
```

### ejs

```
npm i -S ejs
```

in app.js

```
app.use(views(__dirname + '/views-ejs', {
  extension: 'ejs' 
}));
```

## 目录结构

```
.
├── LICENSE
├── README.md
├── app.js
├── bin
│   ├── run
│   └── www
├── node_modules
│   ├── co
│   ├── debug
│   ├── ejs
│   ├── jade
│   ├── koa
│   ├── koa-bodyparser
│   ├── koa-convert
│   ├── koa-json
│   ├── koa-logger
│   ├── koa-onerror
│   ├── koa-router
│   ├── koa-static
│   ├── koa-views
│   ├── nodemon
│   └── runkoa
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
├── routes
│   ├── index.js
│   └── users.js
├── views
│   ├── error.jade
│   ├── index.jade
│   └── layout.jade
└── views-ejs
    ├── error.ejs
    └── index.ejs

24 directories, 13 files
```

说明

- bin/run(runkoa执行bin/www)
- bin/www是常规koa启动文件，和express的一样
- views是放默认的jade文件
- views-ejs是放ejs文件