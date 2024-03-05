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

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shallowEqual = function shallowEqual(objA, objB) {
	if (objA === objB) {
		return true;
	}

	if ((typeof objA === 'undefined' ? 'undefined' : (0, _typeof3.default)(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : (0, _typeof3.default)(objB)) !== 'object' || objB === null) {
		return false;
	}
	var keysA = (0, _keys2.default)(objA);
	var keysB = (0, _keys2.default)(objB);

	if (keysA.length !== keysB.length) {
		return false;
	}

	var bHasOwnProperty = hasOwnProperty.bind(objB);
	for (var i = 0; i < keysA.length; i++) {
		var keyA = keysA[i];

		if (objA[keyA] === objB[keyA]) {
			continue;
		}

		// special diff with Array or Object
		if (_lodash2.default.isArray(objA[keyA])) {
			if (!_lodash2.default.isArray(objB[keyA]) || objA[keyA].length !== objB[keyA].length) {
				return false;
			} else if (!_lodash2.default.isEqual(objA[keyA], objB[keyA])) {
				return false;
			}
		} else if (_lodash2.default.isPlainObject(objA[keyA])) {
			if (!_lodash2.default.isPlainObject(objB[keyA]) || !_lodash2.default.isEqual(objA[keyA], objB[keyA])) {
				return false;
			}
		} else if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
			return false;
		}
	}

	return true;
};
function HOCReactComponent(WrappedComponent) {
	return function (_React$Component) {
		(0, _inherits3.default)(_class, _React$Component);

		function _class() {
			(0, _classCallCheck3.default)(this, _class);
			return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
		}

		(0, _createClass3.default)(_class, [{
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate(nextProps, nextState) {
				return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(WrappedComponent, this.props);
			}
		}]);
		return _class;
	}(_react2.default.Component);
}
exports.default = HOCReactComponent;