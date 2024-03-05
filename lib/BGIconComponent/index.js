'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***
 * @param type: 图标类型  default-正常图标 sprits-雪碧图 
 * @param imgSrc: 图片链接（require之后的）
 * @param transformSize: 缩放比例
 * @param width: 展示图片的原始宽度
 * @param height: 展示图片的原始高度
 * @param classInfo: 图片上的class信息
 * @param fontSize: 背景图片中文字的大小
 * @param text: 文字的内容
 * @param textStyle：文字的样式
 * 
 *  */
var BackgroundIconComponent = function (_Component) {
    (0, _inherits3.default)(BackgroundIconComponent, _Component);

    function BackgroundIconComponent(props) {
        (0, _classCallCheck3.default)(this, BackgroundIconComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BackgroundIconComponent.__proto__ || (0, _getPrototypeOf2.default)(BackgroundIconComponent)).call(this, props));

        _this.handleMargin = function (w, h, t) {
            var tb = -(h * (1 - t) / 2);
            var lr = -(w * (1 - t) / 2);
            return tb + 'px ' + lr + 'px';
        };

        return _this;
    }

    (0, _createClass3.default)(BackgroundIconComponent, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$type = _props.type,
                type = _props$type === undefined ? 'default' : _props$type,
                imgSrc = _props.imgSrc,
                transformSize = _props.transformSize,
                width = _props.width,
                height = _props.height,
                classInfo = _props.classInfo,
                _props$fontSize = _props.fontSize,
                fontSize = _props$fontSize === undefined ? 12 : _props$fontSize,
                text = _props.text,
                textStyle = _props.textStyle;


            var marginStr = this.handleMargin(width, height, transformSize);

            var styleInfo = {
                width: width,
                height: height,
                display: 'inline-block',
                transform: 'scale(' + transformSize + ')',
                verticalAlign: 'text-bottom',
                margin: marginStr,
                fontSize: fontSize / transformSize
            };

            if (type === 'default') {
                styleInfo.background = 'url(' + imgSrc + ') no-repeat';
            } else {
                styleInfo.backgroundImage = 'url(' + imgSrc + ')';
                styleInfo.backgroundRepeat = 'no-repeat';
            }

            return _react2.default.createElement(
                'span',
                { style: styleInfo, className: classInfo },
                _react2.default.createElement(
                    'span',
                    { style: textStyle },
                    text
                )
            );
        }
    }]);
    return BackgroundIconComponent;
}(_react.Component);

exports.default = BackgroundIconComponent;