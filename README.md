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
