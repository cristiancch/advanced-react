'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _App = require('../components/App');

var _App2 = _interopRequireDefault(_App);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _index = require('../state-api/lib/index');

var _index2 = _interopRequireDefault(_index);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const serverRender = async () => {
    const resp = await _axios2.default.get(`http://${_config.host}:${_config.port}/data`);
    const store = new _index2.default(resp.data);

    return {
        initialMarkup: _server2.default.renderToString(_react2.default.createElement(_App2.default, { store: store })),
        initialData: resp.data
    };
};

exports.default = serverRender;