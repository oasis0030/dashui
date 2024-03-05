"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Th = function Th(_ref) {
    var one = _ref.one,
        index = _ref.index;

    var key = one.dataIndex + "th" + index;
    return _react2.default.createElement(
        "th",
        { key: key, className: "detail-table-th" },
        one.title
    );
};
var Td = function Td(_ref2) {
    var one = _ref2.one,
        index = _ref2.index,
        dataSource = _ref2.dataSource;

    var key = one.dataIndex + "td" + index;
    return _react2.default.createElement(
        "td",
        {
            key: key,
            colSpan: one.colspan - 1,
            className: "detail-table-td"
        },
        one.render ? one.render(dataSource[one.dataIndex], dataSource) : dataSource[one.dataIndex]
    );
};

var DetailTable = function (_Component) {
    (0, _inherits3.default)(DetailTable, _Component);

    function DetailTable(props) {
        (0, _classCallCheck3.default)(this, DetailTable);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DetailTable.__proto__ || (0, _getPrototypeOf2.default)(DetailTable)).call(this, props));

        _this.getTableList = function (dataSource, columns) {
            var _this$props = _this.props,
                _this$props$isPendRig = _this$props.isPendRight,
                isPendRight = _this$props$isPendRig === undefined ? false : _this$props$isPendRig,
                _this$props$isPendLas = _this$props.isPendLast,
                isPendLast = _this$props$isPendLas === undefined ? false : _this$props$isPendLas,
                _this$props$columnCou = _this$props.columnCount,
                columnCount = _this$props$columnCou === undefined ? 4 : _this$props$columnCou;

            var columnsForTwDimension = [];
            var number = 0;
            //确定切割数组的索引下标
            var columnsWithColspan = columns.map(function (item) {
                return (0, _extends3.default)({}, item, { colspan: (item.colspan || 1) + 1 });
            });
            var splitIndexArr = columnsWithColspan.reduce(function (arr, item, index, sourceArr) {
                number += item.colspan;
                if (number > columnCount) {
                    //补全行尾的最后一个单元格
                    isPendRight && (sourceArr[index - 1].colspan += columnCount - (number - item.colspan));
                    number = item.colspan;
                    arr.push(index);
                }
                return arr;
            }, []);

            //补全行尾的最后一个单元格
            isPendLast && (columnsWithColspan[columnsWithColspan.length - 1].colspan += columnCount - number);

            //根据切割下标将一维数组拆成二维数组
            splitIndexArr.push(columnsWithColspan.length);
            splitIndexArr.reduce(function (pre, next) {
                var _arr = columnsWithColspan.slice(pre, next);
                columnsForTwDimension.push(_arr);
                return next;
            }, 0);
            return columnsForTwDimension;
        };

        _this.handleChildren = function (dataSource, subList) {
            var children = [];
            subList.forEach(function (one, index) {
                children.push(_react2.default.createElement(Th, { one: one, index: index }));
                children.push(_react2.default.createElement(Td, { one: one, index: index, dataSource: dataSource }));
            });
            return children;
        };

        return _this;
    }

    (0, _createClass3.default)(DetailTable, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                dataSource = _props.dataSource,
                columns = _props.columns,
                className = _props.className,
                style = _props.style,
                _props$isFilterZero = _props.isFilterZero,
                isFilterZero = _props$isFilterZero === undefined ? true : _props$isFilterZero;
            //过滤数值为0的列

            var filterColumns = isFilterZero ? columns.filter(function (item) {
                return dataSource[item.key];
            }) : columns;
            if (filterColumns.length == 0) {
                return null;
            }
            var tableList = this.getTableList(dataSource, filterColumns);
            var classNameValue = "detail-table " + (className || '');
            return _react2.default.createElement(
                "table",
                { style: style, className: classNameValue },
                _react2.default.createElement(
                    "tbody",
                    null,
                    tableList.map(function (subList, index) {
                        return _react2.default.createElement(
                            "tr",
                            { key: index, className: "detail-table-tr" },
                            _this2.handleChildren(dataSource, subList)
                        );
                    })
                )
            );
        }
    }]);
    return DetailTable;
}(_react.Component);

DetailTable.propTypes = {
    columns: _propTypes2.default.array.isRequired,
    dataSource: _propTypes2.default.object.isRequired,
    isPendRight: _propTypes2.default.bool, //补全行尾的最后一个单元格 false
    isPendLast: _propTypes2.default.object, //补全表格最后一个单元格 false
    isFilterZero: _propTypes2.default.object, //是否过滤掉结果为0的统计项 false
    columnCount: _propTypes2.default.number, //总列数
    style: _propTypes2.default.object,
    className: _propTypes2.default.string

};

exports.default = DetailTable;