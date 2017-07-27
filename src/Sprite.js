/**
 * 九宫格的概念 参考了白鹭的文档 http://developer.egret.com/cn/2d/bitmapTexture/scale9Grid
 * 九宫格位置  scale9Grid=[30,31,50,41] 则表示的含义为 [30：区域1 的宽度值， 31：区域1 的高度值， 40：区域2 的宽度值 ，41：区域4 的高度值]
 *     ------------—
 *      | 1 | 2 | 3 |
 *      -------------
 *      | 4 | 5 | 6 |
 *      -------------
 *      | 7 | 8 | 9 |
 *      -------------
 * @class Sprite
 * @constructor
 * @memberof Tiny.NinePatch
 * @extends Tiny.Container
 */
class Sprite extends Tiny.Sprite {
  /**
  * @constructor
  * @param {Tiny.BaseTexture} texture - 九宫格纹理
  * @param {Array<Number>} scale9Grid - 九宫格定义
  * @param {number} width - 宽度
  * @param {number} height - 高度
  */
  constructor(texture, width, height, scale9Grid) {
    super();
    /*
        九宫格的概念 参考了白鹭的文档 http://developer.egret.com/cn/2d/bitmapTexture/scale9Grid
        九宫格位置  scale9Grid=[30,31,50,41] 则表示的含义为 [30：区域1 的宽度值， 31：区域1 的高度值， 40：区域2 的宽度值 ，41：区域4 的高度值]
        ------------—
        | 1 | 2 | 3 |
        -------------
        | 4 | 5 | 6 |
        -------------
        | 7 | 8 | 9 |
        -------------
    */
    this.baseTexture = texture;
    /**
     * @private
     */
    this._loaded = 0;

    if (width === undefined) {
      width = this.baseTexture.width;
    }

    if (height === undefined) {
      height = this.baseTexture.height;
    }

    this._targetWidth = width;
    this._targetHeight = height;


    var w1 = scale9Grid[0];
    var w2 = scale9Grid[2];
    var w3 = this.baseTexture.width - w1 - w2;

    var h1 = scale9Grid[1];
    var h2 = scale9Grid[3];
    var h3 = this.baseTexture.height - h1 - h2;


    var wArr = [w1, w2, w3];
    var xArr = [0, w1, w1 + w2];

    var hArr = [h1, h2, h3];
    var yArr = [0, h1, h1 + h2];

    const rectFrames = [];
    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        var rect = new Tiny.Rectangle(xArr[col], yArr[row], wArr[col], hArr[row]);
        rectFrames.push(rect);
      }
    }

    this.textures = [];
    this.sprites = [];
    var orig = new Tiny.Rectangle(0, 0, this.baseTexture.width, this.baseTexture.height);
    var trim = null;
    for (var i = 0; i < 9; i++) {
      var frame = rectFrames[i];
      var t = new Tiny.Texture(
        this.baseTexture,
        frame,
        orig,
        trim,
        0
      );
      this.textures.push(t);
      var child = new Tiny.Sprite(t);
      this.sprites.push(child);
      child.x = frame.x;
      child.y = frame.y;
      child.width = frame.width;
      child.height = frame.height;
      this.addChild(child);
      this._loaded++;
    }

    this._update();
  }

  /**
  * @name Tiny.NinePatch.Sprite#width
  * @property {number} width - 宽度
  */
  get width() {
    return this._targetWidth;
  }
  set width(value) {
    if (this._targetWidth < this.baseTexture.width) {
      throw Error('九宫格尺寸设置错误，尺寸不能小于素材尺寸');
    }
    this._targetWidth = value;
    this._update();
  }

  /**
  * @name Tiny.NinePatch.Sprite#height
  * @property {number} height - 高度
  */
  get height() {
    return this._targetHeight;
  }
  set height(value) {
    if (this._targetHeight < this.baseTexture.height) {
      throw Error('九宫格尺寸设置错误，尺寸不能小于素材尺寸');
    }
    this._targetHeight = value;
    this._update();
  }

  /**
  * 改变尺寸
  * @private
  * @method Tiny.NinePatch.Sprite#resize
  * @param {number} width 宽度
  * @param {number} height 高度
  */
  resize(width, height) {
    this._update(width, height);
  }

  /**
   * 更新
   * @private
   * @method Tiny.NinePatch.Sprite#update
   * @param {number} [width=null]
   * @param {number} [height=null]
   */
  _update(width, height) {
    // update width if supplied
    if (width !== undefined) {
      this._targetWidth = width;
    }

    // update height if supplied
    if (height !== undefined) {
      this._targetHeight = height;
    }

    if (this._targetWidth < this.baseTexture.width || this._targetHeight < this.baseTexture.height) {
      throw Error('九宫格尺寸设置错误，尺寸不能小于素材尺寸');
    }

    if (this._loaded !== 9) return;

    var child;

    // 九宫格位置2 顶部中间 top middle
    child = this.children[1];
    child.position.set(this.children[0].width, 0);
    child.width = this._targetWidth - child.x - this.children[2].width;

    // 九宫格位置 3 顶部右上角
    child = this.children[2];
    child.position.set(this._targetWidth - child.width, 0);

    // 九宫格位置4 中间左侧
    child = this.children[3];
    child.position.set(0, this.children[0].height);
    child.height = this._targetHeight - child.y - this.children[6].height;

    // 九宫格位置5 正中间
    child = this.children[4];
    child.position.set(this.children[1].x, this.children[3].y);
    child.height = this.children[3].height;
    child.width = this.children[1].width;

    // 九宫格位置6 中间右侧
    child = this.children[5];
    child.position.set(this._targetWidth - child.width, this.children[3].y);
    child.height = this.children[3].height;

    // 九宫格位置7 底部左侧
    child = this.children[6];
    child.position.set(0, this._targetHeight - child.height);

    // 九宫格位置8 底部中间
    child = this.children[7];
    child.position.set(this.children[1].x, this._targetHeight - child.height);
    child.width = this.children[1].width;

    // 九宫格位置9 底部右侧
    child = this.children[8];
    child.position.set(this._targetWidth - child.width, this._targetHeight - child.height);

    // this.width = this._targetWidth;
    // this.height = this._targetHeight;
    // this.dispatch('updated');
  }
}

export default Sprite;
