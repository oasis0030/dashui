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

var _index = require('../BGIconComponent/index');

var _index2 = _interopRequireDefault(_index);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//平台码表
var iconTypes = {
    1: "weibo",
    2: "tencent-weibo",
    3: "sohu-weibo",
    4: "wangyi",
    8: "renren",
    9: "wechat",
    14: "baidu",
    17: "weitao",
    18: "weishi",
    23: "pengyouquan",
    24: "miaopai",
    25: "meipai",
    26: "toutiao",
    27: "nice",
    28: "in",
    29: "youku",
    30: "tudou",
    31: "ximalaya",
    32: "lizhi",
    33: 'qqpublic',
    93: "xiaohongshu",
    94: "zhihu",
    100: "iqiyi",
    101: "sohu-video",
    102: "tencent-video",
    103: "kuaishou",
    104: "yy",
    105: "yingke",
    106: "yizhibo",
    107: "douyu",
    108: "huajiao",
    109: "xiaokaxiu",
    110: "bilibili",
    111: "acfun",
    112: "weixinshipinhao",
    113: "huya",
    114: "xiongmao",
    115: "douyin",
    116: "huoshan",
    117: "momo",
    118: "xigua",
    119: "taobao",
    120: "weishi-2",
    9000: "video",
    10000: 'other'

    /***
     * @param icon_type:图标类型
     * @param weibo_type: 平台id
     * @param widthSize: 图标大小
     * 
     *  */
};
var WBYPlatformIcon = function (_Component) {
    (0, _inherits3.default)(WBYPlatformIcon, _Component);

    function WBYPlatformIcon(props) {
        (0, _classCallCheck3.default)(this, WBYPlatformIcon);
        return (0, _possibleConstructorReturn3.default)(this, (WBYPlatformIcon.__proto__ || (0, _getPrototypeOf2.default)(WBYPlatformIcon)).call(this, props));
    }

    (0, _createClass3.default)(WBYPlatformIcon, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$icon_type = _props.icon_type,
                icon_type = _props$icon_type === undefined ? 'default' : _props$icon_type,
                _props$weibo_type = _props.weibo_type,
                weibo_type = _props$weibo_type === undefined ? 10000 : _props$weibo_type,
                _props$widthSize = _props.widthSize,
                widthSize = _props$widthSize === undefined ? 20 : _props$widthSize;


            var iconTypesPostfix = {
                'default': '',
                'gray': '-gray' //class后缀

            };var iconClassName = "icon-" + (iconTypes[weibo_type] || iconTypes[10000]) + iconTypesPostfix[icon_type];
            var transformSize = widthSize / 240;
            var iconPath = require('./images/platformlist_icons.png');
            return _react2.default.createElement(_index2.default, {
                type: 'sprites',
                imgSrc: iconPath,
                transformSize: transformSize,
                width: 240,
                height: 240,
                classInfo: iconClassName
            });
        }
    }]);
    return WBYPlatformIcon;
}(_react.Component);

exports.default = WBYPlatformIcon;