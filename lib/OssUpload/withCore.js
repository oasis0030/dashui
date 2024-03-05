'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadTips = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _antd = require('antd');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _config = require('./config');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CancelToken = _axios2.default.CancelToken,
    isCancel = _axios2.default.isCancel; /**
                                          * Created by lzb on 2019-01-18.
                                          */

var defaultFileList = [];
/**
 * 处理 data 参数
 * @param data
 * @param more
 * @returns {function(*=): {}}
 */
var handleData = function handleData(data) {
  var more = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (file) {
    var result = {};
    if (typeof data === 'function') {
      result = data(file);
    } else {
      result = data;
    }
    return (0, _extends3.default)({}, result, more);
  };
};
/**
 * 处理文件后缀规则
 * @param suffix
 * @returns {*}
 */
var handleSuffix = function handleSuffix(suffix) {
  if (!suffix || typeof suffix !== 'string') return [];
  var ary = suffix.split(',');
  return ary.map(function (s) {
    return (/^\./.test(s) ? '' : '.') + s.trim();
  });
};
/**
 * 处理底部提示语展示内容
 * @param tipContent
 * @param rule
 * @returns {*}
 */
var handleContent = function handleContent(tipContent, rule) {
  if (typeof tipContent === 'function') {
    return tipContent(rule);
  } else if (typeof tipContent === 'string') {
    return tipContent;
  } else {
    var resultAry = [];
    if (rule.suffix) {
      resultAry.push(handleSuffix(rule.suffix).join(', ') + '\u683C\u5F0F');
    }
    if (rule.max) {
      resultAry.push(rule.max + 'M\u4EE5\u5185');
    }
    return resultAry.length > 0 ? '\u8BF7\u4E0A\u4F20' + resultAry.join('; ') + '\u7684\u6587\u4EF6' : null;
  }
};

/**
 * 底部提示语
 */

var UploadTips = exports.UploadTips = function (_React$Component) {
  (0, _inherits3.default)(UploadTips, _React$Component);

  function UploadTips() {
    (0, _classCallCheck3.default)(this, UploadTips);
    return (0, _possibleConstructorReturn3.default)(this, (UploadTips.__proto__ || (0, _getPrototypeOf2.default)(UploadTips)).apply(this, arguments));
  }

  (0, _createClass3.default)(UploadTips, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.translate) {
        this.node = (0, _reactDom.findDOMNode)(this);
        var targetParent = this.node.parentNode.firstElementChild;
        var targetBefore = targetParent.lastElementChild;
        targetParent.insertBefore(this.node, targetBefore);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'oss-upload-tips ' + this.props.status },
        this.props.content
      );
    }
  }]);
  return UploadTips;
}(_react2.default.Component);

var withCore = function withCore(Upload) {
  var _class, _temp, _initialiseProps;

  return _temp = _class = function (_React$Component2) {
    (0, _inherits3.default)(CoreWrapped, _React$Component2);

    function CoreWrapped(props) {
      (0, _classCallCheck3.default)(this, CoreWrapped);

      var _this2 = (0, _possibleConstructorReturn3.default)(this, (CoreWrapped.__proto__ || (0, _getPrototypeOf2.default)(CoreWrapped)).call(this, props));

      _initialiseProps.call(_this2);

      var fileList = props.fileList || props.defaultFileList || defaultFileList;
      _this2.state = {
        fileList: fileList
      };
      return _this2;
    }

    (0, _createClass3.default)(CoreWrapped, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            data = _props.data,
            rule = _props.rule,
            authToken = _props.authToken,
            sessionId = _props.sessionId,
            empty = _props.empty,
            bucket = _props.bucket,
            action = _props.action,
            headers = _props.headers,
            tipStatus = _props.tipStatus,
            tipContent = _props.tipContent,
            len = _props.len;
        // 不做处理的 antd 自带 props

        var _props2 = this.props,
            children = _props2.children,
            directory = _props2.directory,
            disabled = _props2.disabled,
            listType = _props2.listType,
            multiple = _props2.multiple,
            name = _props2.name,
            showUploadList = _props2.showUploadList,
            supportServerRender = _props2.supportServerRender,
            withCredentials = _props2.withCredentials,
            openFileDialogOnClick = _props2.openFileDialogOnClick,
            onPreview = _props2.onPreview,
            onRemove = _props2.onRemove;
        /**
         * 忽略一些 antd 自带的 props
         * 1. accept --> 请使用 rule.suffix 代替
         * 2. customRequest
         */

        var acceptAry = handleSuffix(rule.suffix);
        var isCard = listType === 'picture-card';
        var content = handleContent(tipContent, rule);
        var props = {
          fileList: this.state.fileList,
          action: action || _config.BUCKET_MAP[bucket], // action 存在 bucket 设置失效
          accept: acceptAry.join(','),
          customRequest: this.customRequest,
          beforeUpload: this.beforeUpload,
          onChange: this.handleChange,
          headers: (0, _extends3.default)({
            'Authorization': authToken,
            'sessionId': sessionId
          }, headers),
          data: handleData(data, {
            'bizzCode': rule.bizzCode
          }),
          disabled: disabled,
          directory: directory,
          listType: listType,
          multiple: multiple,
          name: name,
          showUploadList: showUploadList,
          supportServerRender: supportServerRender,
          withCredentials: withCredentials,
          openFileDialogOnClick: openFileDialogOnClick,
          onPreview: onPreview,
          onRemove: onRemove
        };
        var tipProps = {
          translate: !isCard, status: tipStatus, content: content
        };
        var uploadChildren = isCard && this.state.fileList.length >= len ? null : children || _react2.default.createElement(
          'span',
          { style: { cursor: 'pointer' } },
          _react2.default.createElement(_antd.Icon, { type: 'upload' }),
          ' \u4E0A\u4F20'
        );
        return props.headers['Authorization'] && props.headers['sessionId'] ? _react2.default.createElement(
          'div',
          { className: 'oss-upload clearfix' },
          _react2.default.createElement(
            Upload,
            props,
            uploadChildren
          ),
          _react2.default.createElement(UploadTips, tipProps)
        ) : empty;
      }
    }], [{
      key: 'getDerivedStateFromProps',
      value: function getDerivedStateFromProps(nextProps) {
        var state = {};
        if ('fileList' in nextProps) {
          state.fileList = nextProps.fileList || [];
        }
        return (0, _isEmpty2.default)(state) ? null : state;
      }
    }]);
    return CoreWrapped;
  }(_react2.default.Component), _class.defaultProps = {
    sessionId: _jsCookie2.default.get('token'),
    bucket: 'public',
    data: {},
    headers: {},
    rule: {
      bizzCode: 'F_IMG_0001'
    },
    tipStatus: 'normal',
    empty: _react2.default.createElement(
      'p',
      null,
      'loading...'
    )
  }, _class.propTypes = {
    authToken: _propTypes2.default.string.isRequired,
    sessionId: _propTypes2.default.string.isRequired,
    bucket: _propTypes2.default.oneOf((0, _keys2.default)(_config.BUCKET_MAP)).isRequired,
    rule: _propTypes2.default.shape({
      bizzCode: _propTypes2.default.string.isRequired,
      suffix: _propTypes2.default.string,
      max: _propTypes2.default.number
    }).isRequired,
    headers: _propTypes2.default.object,
    data: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
    empty: _propTypes2.default.element,
    beforeUpload: _propTypes2.default.func,
    mapResponseToFileItem: _propTypes2.default.func,
    tipContent: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
    tipStatus: _propTypes2.default.oneOf(['normal', 'error', 'none']),
    len: _propTypes2.default.number
  }, _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.beforeUpload = function (file, fileList) {
      var _props3 = _this3.props,
          beforeUpload = _props3.beforeUpload,
          rule = _props3.rule,
          len = _props3.len;
      var _rule$max = rule.max,
          max = _rule$max === undefined ? 0 : _rule$max,
          _rule$suffix = rule.suffix,
          suffix = _rule$suffix === undefined ? '' : _rule$suffix;
      // 校验上传数量

      var total = _this3.state.fileList.length + fileList.length;
      var isLtLength = !len || total <= len;
      if (!isLtLength) {
        _antd.message.destroy();
        _antd.message.error('超出最大上传数量!');
        return false;
      }
      // 校验上传大小
      var isLt2M = !max || file.size / 1024 / 1024 < max;
      if (!isLt2M) {
        _antd.message.error('\u6587\u4EF6\u5927\u5C0F\u6709\u8BEF!');
        return false;
      }
      // 校验上传类型
      suffix = handleSuffix(suffix);
      var isFile = suffix.length === 0 || suffix.some(function (type) {
        return (
          // 如果传递的是后缀则判断后缀, 否则判断type
          /^\./.test(type) ? file.name.toUpperCase().endsWith(type.toUpperCase()) : file.type === type
        );
      });
      if (!isFile) {
        _antd.message.error('\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B!');
        return false;
      }
      // 校验结果
      var result = isFile && isLt2M && isLtLength;
      if (result && beforeUpload) {
        result = beforeUpload(file, fileList);
      }
      return result;
    };

    this.triggerChange = function (info) {
      var onChange = _this3.props.onChange;
      if (onChange) {
        onChange(info);
      }
    };

    this.customRequest = function (info) {
      var file = info.file,
          filename = info.filename,
          headers = info.headers,
          data = info.data,
          action = info.action,
          onProgress = info.onProgress,
          onError = info.onError,
          withCredentials = info.withCredentials,
          onSuccess = info.onSuccess;

      var formData = new window.FormData();
      var cancel = void 0;
      var config = {
        withCredentials: withCredentials,
        headers: headers,
        cancelToken: new CancelToken(function (c) {
          cancel = c;
        }),
        onUploadProgress: function onUploadProgress(_ref) {
          var total = _ref.total,
              loaded = _ref.loaded;

          onProgress({ percent: parseFloat(Math.round(loaded / total * 100).toFixed(2)) }, file);
        }
      };
      if (data) {
        (0, _keys2.default)(data).map(function (key) {
          formData.append(key, data[key]);
        });
      }
      formData.append(filename, file);
      _axios2.default.post(action, formData, config).then(function (_ref2) {
        var response = _ref2.data;

        if (response.code === '1000') {
          // 处理文件显示
          response.url = response.data;
          onSuccess(response, file);
        } else {
          _antd.message.destroy();
          _antd.message.error(response.msg);
          onError(new Error(response.msg), response);
        }
      }).catch(function (error) {
        if (isCancel(error)) {
          // 获取 取消请求 的相关信息
          console.warn('Request canceled', error.message); // eslint-disable-line
        } else {
          // 处理其他异常
          _antd.message.destroy();
          _antd.message.error(error.message);
          onError(error);
        }
      });

      return {
        abort: function abort() {
          cancel('停止上传文件');
        }
      };
    };

    this.handleChange = function (info) {
      var fileList = info.fileList;
      // 根据服务器的响应过滤上传失败(或没有状态)的文件
      fileList = fileList.filter(function (file) {
        return file.status && file.status !== 'error';
      });
      // 从响应中读取并显示文件信息
      fileList = fileList.map(function (file) {
        if (file.response && file.response.url) {
          file.url = file.response.url;
          var more = {};
          if (_this3.props.mapResponseToFileItem) {
            more = _this3.props.mapResponseToFileItem(file.response);
          }
          file = (0, _assign2.default)({}, file, more);
        }
        return file;
      });
      _this3.setState({ fileList: fileList });
      info.fileList = fileList;
      _this3.triggerChange(info);
    };
  }, _temp;
};

exports.default = withCore;