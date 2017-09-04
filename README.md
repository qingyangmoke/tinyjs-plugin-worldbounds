# tinyjs-plugin-worldbounds

> 系统边界

## 查看demo

`demo/index.html`

## 引用方法

- 推荐作为依赖使用

  - `npm install tinyjs-plugin-worldbounds --save`
  - 或者使用 ./dist/index.js 或者./dist/index.debug.js

## 起步
首先当然是要引入，推荐`NPM`方式，当然你也可以下载独立版本，先从几个例子入手吧！

##### 1、最简单的例子

引用 Tiny.js 源码

``` js
const maxVelcity = 800;
var control = new Tiny.WorldBounds.CircleBoundController(bigCircle.position.x, bigCircle.position.y, bigCircleRadius, 5, maxVelcity);
app.onUpdate(function () {
  control.update();
}, true);
```

## 相关文档
- [Tiny.js](http://tinyjs.net/#/docs/api)
- [tinyjs-plugin-p2](https://github.com/qingyangmoke/tinyjs-plugin-p2.git)

## API文档
``` js
  // 项目基于jsdoc自动生成API文档
  git clone https://github.com/qingyangmoke/tinyjs-plugin-worldbounds.git
  cd tinyjs-plugin-worldbounds
  npm i
  npm run doc
```

## demo
 ./demo

