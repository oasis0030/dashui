'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _antd = require('antd');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

require('./index.css');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _blueimpMd = require('blueimp-md5');

var _blueimpMd2 = _interopRequireDefault(_blueimpMd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleAccrpt(accept) {
    if (!accept || typeof accept !== 'string') return [];
    var ary = accept.split(',');
    return ary.map(function (s) {
        return s.trim();
    });
}

function handleValue(value) {
    return ['url', 'name', 'filepath', 'status', 'uid'].reduce(function (_value, key) {
        if (!value[key]) {
            switch (key) {
                case 'url':
                case 'name':
                case 'filepath':
                    console.error('传入的value[object]必须包含: ' + key);
                    break;
                case 'status':
                    _value[key] = _value['done'];
                    break;
                case 'uid':
                    _value[key] = _value['key'] || (0, _blueimpMd2.default)(_value['filepath'], Math.random());
                    break;
            }
        }
        return _value;
    }, (0, _extends3.default)({}, value));
}

var UploadFile = function (_Component) {
    (0, _inherits3.default)(UploadFile, _Component);

    // 上传前校验
    function UploadFile(props) {
        (0, _classCallCheck3.default)(this, UploadFile);

        // 根据props初始化基本数值
        var _this = (0, _possibleConstructorReturn3.default)(this, (UploadFile.__proto__ || (0, _getPrototypeOf2.default)(UploadFile)).call(this, props));

        _initialiseProps.call(_this);

        _this.init(props);
        // 设置容器ID
        _this.did = ('upload-files-container-' + Math.random() + new Date().getTime()).replace('.', '');
        // 创建请求容器
        _this.axiosList = [];

        return _this;
    }
    // 获取filelist


    (0, _createClass3.default)(UploadFile, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                tok = _props.tok,
                _props$value = _props.value,
                value = _props$value === undefined ? [] : _props$value,
                len = _props.len;
            // 校验传入的tok值, 给予提示

            if (!tok) {
                throw new Error('需要传入tok 为 tokenAPI(获取token的接口,需要带"/api") 或者包含 token & urload_url 的对象');
            }

            var tokenAPI = void 0,
                upload_url = void 0,
                token = void 0;
            // 初始化token 数据
            if (typeof tok === 'string') {
                tokenAPI = this.tokenAPI = tok;
                this.getToken(tokenAPI);
            } else {
                // 设置默认的token/upload_url值
                var _ref = [tok.upload_url, tok.token];
                upload_url = _ref[0];
                token = _ref[1];
                if (upload_url && token) {
                    this.setState({
                        upload_url: upload_url,
                        token: token,
                        isParentToken: true,
                        disabled: false
                    });
                } else {
                    throw new Error('传入的 token 或 urload_url 不能为空');
                }
            }

            // 设置默认的filelist为传入的value(大于限制长度的项会被截取)
            if (value && Array.isArray(value) && value.length) {
                this.setState({ fileList: value.slice(0, len).map(function (v) {
                        return handleValue(v);
                    }) });
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // 判断filelist的值 为false 或与上次相等则不操作否则将重新赋值
            var cur = nextProps.value ? nextProps.value : [];
            if ((0, _isEqual2.default)(cur, this.props.value)) return;
            // 初始化数据
            this.init(nextProps);
            this.setState({ fileList: cur.slice(0, nextProps.len).map(function (v) {
                    return handleValue(v);
                }) });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            /*this.container = document.querySelector('#' + this.did)
            this.itemsDom = [...this.container.querySelectorAll('.ant-upload-list-item'), this.container.querySelector('.ant-upload-select')]*/
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            /*this.itemsDom.forEach(node => {
                Object.entries(this.props.itemStyle).forEach(([key,value]) => {
                    node.style[key] = value
                })
            })*/
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                len = _props2.len,
                multiple = _props2.multiple,
                accept = _props2.accept,
                onPreview = _props2.onPreview,
                showUploadList = _props2.showUploadList,
                listType = _props2.listType,
                btnProps = _props2.btnProps,
                uploadText = _props2.uploadText;
            var _state = this.state,
                fileList = _state.fileList,
                disabled = _state.disabled;

            var uploadButton = null;
            if (listType === 'picture-card') {
                uploadButton = _react2.default.createElement(
                    'div',
                    { className: 'type-' + listType + (disabled || this.props.disabled ? ' disabled' : '') },
                    _react2.default.createElement(_antd.Icon, { className: 'upload-icon', type: this.state.loading ? 'loading' : 'plus' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'upload-text' },
                        uploadText
                    )
                );
            } else {
                uploadButton = _react2.default.createElement(
                    _antd.Button,
                    (0, _extends3.default)({ className: 'type-' + listType, disabled: disabled || this.props.disabled }, btnProps),
                    _react2.default.createElement(_antd.Icon, { className: 'upload-icon', type: this.state.loading ? 'loading' : 'upload' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'upload-text' },
                        uploadText
                    )
                );
            }
            return _react2.default.createElement(
                'div',
                { className: 'wby-upload-files-container', id: this.did },
                _react2.default.createElement(
                    _antd.Upload,
                    {
                        disabled: disabled || this.props.disabled,
                        listType: listType,
                        showUploadList: showUploadList,
                        fileList: fileList.slice(0, len),
                        multiple: multiple,
                        beforeUpload: this.beforeUpload,
                        customRequest: this.handleChange,
                        accept: accept,
                        onRemove: this.onRemove,
                        onPreview: onPreview
                    },
                    fileList.length >= len ? null : uploadButton
                )
            );
        }
    }]);
    return UploadFile;
}(_react.Component);

UploadFile.defaultProps = {
    len: 1,
    size: 10,
    multiple: false,
    accept: "",
    listType: 'picture-card',
    btnProps: {},
    disabled: false,
    uploadText: '上传',
    mapResponseToFileItem: function mapResponseToFileItem() {
        return {};
    },
    beforeUpload: function beforeUpload() {
        return true;
    }
};
UploadFile.propTypes = {
    value: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        url: _propTypes2.default.string.isRequired,
        name: _propTypes2.default.string.isRequired,
        filepath: _propTypes2.default.string.isRequired
    })),
    tok: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
        token: _propTypes2.default.string.isRequired,
        upload_url: _propTypes2.default.string.isRequired
    })]).isRequired,
    len: _propTypes2.default.number,
    multiple: _propTypes2.default.bool,
    accept: _propTypes2.default.string,
    mapResponseToFileItem: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onPreview: _propTypes2.default.func,
    disabled: _propTypes2.default.bool,
    listType: _propTypes2.default.oneOf(['text', 'picture-card', 'picture']),
    btnProps: _propTypes2.default.object,
    beforeUpload: _propTypes2.default.func,
    uploadText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
    // itemStyle: PropTypes.object
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.state = {
        loading: false,
        disabled: true,
        token: null,
        upload_url: null,
        fileList: [],
        isParentToken: false

    };

    this.getFiles = function () {
        return JSON.parse((0, _stringify2.default)(_this2.state.fileList));
    };

    this.beforeUpload = function (file) {
        var _props3 = _this2.props,
            len = _props3.len,
            size = _props3.size,
            beforeUpload = _props3.beforeUpload;

        var isLtLength = _this2.length < len;
        if (!isLtLength) {
            _antd.message.error('超出最大上传数量，多余项目不会上传!');
        }
        var isFile = _this2.accept.length === 0 || _this2.accept.some(function (type) {
            return (
                // 如果传递的是后缀则判断后缀, 否则判断type
                /^\./.test(type) ? file.name.toUpperCase().endsWith(type.toUpperCase()) : file.type === type
            );
        });
        if (!isFile) {
            _antd.message.error('上传格式有误!');
        }
        var isLt2M = file.size / 1024 / 1024 < size;
        if (!isLt2M) {
            _antd.message.error('上传大小有误!');
        }
        var result = isLtLength && isFile && isLt2M && beforeUpload(file, _antd.message);
        if (result) _this2.length++;
        return result;
    };

    this.handleFileItem = function (data) {
        var obj = {
            uid: data.key || (0, _blueimpMd2.default)(data.filepath, Math.random()),
            name: data.file_original_name,
            url: data.url,
            status: "done",
            filepath: data.filepath
        };

        var _obj = _this2.props.mapResponseToFileItem(data);
        return (0, _assign2.default)(_obj, obj);
    };

    this.handleChange = function (info) {
        var _state2 = _this2.state,
            upload_url = _state2.upload_url,
            token = _state2.token,
            isParentToken = _state2.isParentToken;

        if (!(upload_url && token)) return console.error('上传失败，upload_url 或 token 获取错误!');
        _this2.setState({
            loading: true
        });

        var formData = new window.FormData();
        formData.append("qq_file", info.file);
        formData.append("token", token);
        // 容器内增加请求
        _this2.axiosList.push(formData);
        _axios2.default.post(upload_url, formData).then(function (response) {
            // 容器内移除本次请求
            _this2.axiosList = _this2.axiosList.filter(function (item) {
                return item !== formData;
            });
            // 获取最新的filelist
            var fileList = _this2.state.fileList;

            if (response.data.code === 1000) {
                var list = [].concat((0, _toConsumableArray3.default)(fileList), [_this2.handleFileItem(response.data.data)]);
                _this2.setState({ fileList: list, loading: _this2.axiosList.length !== 0 }, function () {
                    _this2.props.onChange && _this2.props.onChange([].concat((0, _toConsumableArray3.default)(list)));
                });
            } else if (isParentToken && _this2.tokenAPI) {
                _this2.length--;
                _this2.getToken().then(function () {
                    _this2.handleChange(info);
                });
            } else {
                _this2.length--;
                _this2.setState({
                    loading: false
                }, function () {
                    console.error('错误信息: ' + response.data.msg);
                    _antd.message.error('上传失败! 请重新上传');
                });
            }
        }).catch(function () {
            // 容器内移除本次请求
            _this2.axiosList = _this2.axiosList.filter(function (item) {
                return item !== formData;
            });
            _this2.length--;
            if (isParentToken && _this2.tokenAPI) _this2.getToken().then(function () {
                _this2.handleChange(info);
            });
        });
    };

    this.onRemove = function (info) {
        var fileList = [].concat((0, _toConsumableArray3.default)(_this2.state.fileList.filter(function (item) {
            return item.uid !== info.uid;
        })));
        _this2.setState({ fileList: fileList }, function () {
            _this2.length--;
            _this2.props.onChange && _this2.props.onChange(fileList);
        });
    };

    this.getToken = function (tokenAPI) {
        tokenAPI = tokenAPI || _this2.tokenAPI || '';
        return tokenAPI ? _axios2.default.get(tokenAPI).then(function (_ref2) {
            var data = _ref2.data;

            data.data && _this2.setState((0, _extends3.default)({}, data.data, { isParentToken: false, disabled: false }));
        }) : _promise2.default.reject();
    };

    this.init = function (props) {
        // 设置长度计数器的默认值
        _this2.length = Array.isArray(props.value) ? props.value.length > props.len ? props.len : props.value.length : 0;
        // 设置文件格式数组
        _this2.accept = handleAccrpt(props.accept);
    };
};

exports.default = UploadFile;