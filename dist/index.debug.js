/*!
 * tinyjs-plugin-worldbounds
 * Description:Tinyjs 系统边界
 * Author: 清扬陌客
 * Version: v0.1.1
 * Github: https://github.com/qingyangmoke/tinyjs-plugin-worldbounds.git
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WorldBounds"] = factory();
	else
		root["Tiny"] = root["Tiny"] || {}, root["Tiny"]["WorldBounds"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Users/song/Develop/github/tinyjs-plugin-worldbounds/dist";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CircleBoundController = undefined;

	var _CircleBoundController = __webpack_require__(2);

	var _CircleBoundController2 = _interopRequireDefault(_CircleBoundController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.CircleBoundController = _CircleBoundController2.default; /**
	                                                                 * Tiny.js
	                                                                 * @external Tiny
	                                                                 * @see {@link http://tinyjs.net/}
	                                                                 */

	/**
	 * @namespace WorldBounds
	 * @memberof Tiny
	 */

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * 辅助类 - 圆形边界控制器 目前只支持圆形物体
	 * @author 采东<fusheng.sfs@antfin.com>
	 * @param {number} x - 边界的圆心x坐标
	 * @param {number} y - 边界的圆心y坐标
	 * @param {number} radius - 边界的圆半径
	 * @param {number} borderThickness - 边框的厚度 为了效果更加真实 增加一个边缘厚度 这样小球和最边缘会保持一个厚度的距离 类似玻璃杯 外壁也是有厚度的 看来效果更舒服
	 * @param {number} maxVelcity - 小球运动的最大速度
	 */
	var CircleBoundController = function CircleBoundController(x, y, radius, borderThickness, maxVelcity) {
	  this.x = x;
	  this.y = y;
	  this.left = x - radius;
	  this.right = x + radius;
	  this.top = y - radius;
	  this.bottom = y + radius;
	  this.maxVelcity = maxVelcity;
	  this.borderThickness = borderThickness;
	  this.originRadius = radius;
	  this.radius = radius - borderThickness;
	  this.balls = [];
	};

	/**
	 * 获取小球的x坐标
	 */
	CircleBoundController.prototype.getX = function (a) {
	  return a.body.x;
	};

	/**
	 * 获取小球的y坐标
	 */
	CircleBoundController.prototype.getY = function (a) {
	  return a.body.y;
	};

	/**
	 * 添加小球
	 */
	CircleBoundController.prototype.addBall = function (ball) {
	  this.balls.push(ball);
	};

	/**
	 * 删除小球
	 */
	CircleBoundController.prototype.removeBall = function (ball) {
	  var index = this.balls.indexOf(ball);
	  if (index > -1) {
	    this.balls.splice(index, 1);
	  }
	};

	/**
	 * 清空小球
	 */
	CircleBoundController.prototype.clear = function () {
	  this.balls.length = 0;
	};

	/**
	 * 判断小球是否在以圆心为原点的x轴上
	 */
	CircleBoundController.prototype.inXaxis = function (ball) {
	  return this.getX(ball) === this.x;
	};

	/**
	 * 判断小球是否在以圆心为原点的y轴上
	 */
	CircleBoundController.prototype.inYaxis = function (ball) {
	  return this.getY(ball) === this.y;
	};

	/**
	 * 获取小球和圆心的角度
	 */
	CircleBoundController.prototype.getAngle = function (e) {
	  return Tiny.Physics.P2.Math.wrapAngle(Tiny.Physics.P2.Math.angle(this.x, this.y, this.getX(e), this.getY(e)), true);
	};

	/**
	 * 获取小球当前角度在圆形边界的最大边界位置
	 */
	CircleBoundController.prototype.getMaxPointFromBall = function (e) {
	  var radius = this.radius - e.width / 2;
	  // // 根据角度计算最大距离
	  var angle = this.getAngle(e);
	  return this.getMaxPoint(angle, radius);
	};

	/**
	 * 根据角度计算半径为radius圆形边界的最大边界位置
	 */
	CircleBoundController.prototype.getMaxPoint = function (angle, radius) {
	  var x0 = 0;
	  var y0 = 0;
	  if (angle == 0) {
	    x0 = radius;
	    y0 = 0;
	  } else if (angle == Math.PI / 2) {
	    x0 = 0;
	    y0 = radius;
	  } else if (angle == Math.PI) {
	    x0 = -radius;
	    y0 = 0;
	  } else if (angle == -Math.PI / 2) {
	    x0 = 0;
	    y0 = -radius;
	  } else {
	    x0 = radius * Math.cos(angle);
	    y0 = radius * Math.sin(angle);
	  }
	  var x1 = this.x + x0;
	  var y1 = this.y + y0;
	  return {
	    x: x1,
	    y: y1
	  };
	};

	/**
	 * 判断小球是否在圆形边界内
	 */
	CircleBoundController.prototype.inBound = function (e) {
	  var distance = Math.abs(Tiny.Physics.P2.Math.distance(this.getX(e), this.getY(e), this.x, this.y));
	  if (distance <= this.radius - e.width / 2) {
	    return true;
	  }
	  return false;
	};

	/**
	 * 更新 需要在每次刷新的时候主动调用 建议加到 app.onUpdate() 中执行;
	 */
	CircleBoundController.prototype.update = function () {
	  var _this = this;
	  this.balls.forEach(function (e, i) {
	    if (!_this.inBound(e)) {
	      var maxPoint = _this.getMaxPointFromBall(e);
	      var x = _this.getX(e);
	      var y = _this.getY(e);
	      if (maxPoint.x < _this.x && x < maxPoint.x || maxPoint.x > _this.x && x > maxPoint.x) {
	        e.position.x = maxPoint.x;
	        e.body.x = e.position.x;
	        e.body.velocity.x *= -1;
	      }

	      if (y < _this.y && y < maxPoint.y || y > _this.y && y > maxPoint.y) {
	        e.position.y = maxPoint.y;
	        e.body.y = e.position.y;
	        e.body.velocity.y *= -1;
	      }
	    }

	    e.body.velocity.x = Tiny.Physics.P2.Math.wrap(e.body.velocity.x, -_this.maxVelcity, _this.maxVelcity);
	    e.body.velocity.y = Tiny.Physics.P2.Math.wrap(e.body.velocity.y, -_this.maxVelcity, _this.maxVelcity);
	  });
	};

	exports.default = CircleBoundController;

/***/ })
/******/ ])
});
;