'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Upload = require('./Upload');

var _Upload2 = _interopRequireDefault(_Upload);

var _withCore = require('./withCore');

var _Dragger = require('./Dragger');

var _Dragger2 = _interopRequireDefault(_Dragger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OssUpload = _Upload2.default;
OssUpload.Dragger = _Dragger2.default;
OssUpload.UploadTips = _withCore.UploadTips;
exports.default = OssUpload;