(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './config.js', './delay', 'axios'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./config.js'), require('./delay'), require('axios'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.config, global.delay, global.axios);
    global.alertsApi = mod.exports;
  }
})(this, function (exports, _config, _delay, _axios) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _config2 = _interopRequireDefault(_config);

  var _delay2 = _interopRequireDefault(_delay);

  var _axios2 = _interopRequireDefault(_axios);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  //TODO: enhance the api calls with tenant, language and valid dates

  var alerts = [{
    id: 1,
    page: 'home',
    type: 'info',
    title: 'Information',
    message: 'Just nu tar vi ej emot service i Malmö, då vi på grund av sjukdom inte har möjlighet att garantera våra servicetider. Vi ber om ursäkt för eventuella olägenheter det medför. Har du några frågor är du varmt välkommen att kontakta oss på telefon <a href="tel+46774102200">0774 10 2200</a> eller e-post <a href="mailto:service@lan-master.eu">service@lan-master.eu</a>.',
    langCode: 'sv',
    tenant: 'lanmaster'
  }, {
    id: 2,
    page: 'home',
    type: 'success',
    title: 'Success',
    message: 'Success message Success message Success message Success message',
    langCode: 'sv',
    tenant: 'lanmaster'
  }, {
    id: 3,
    page: 'home',
    type: 'danger',
    title: 'Error',
    message: 'Error message',
    langCode: 'en',
    tenant: 'lanmaster'
  }, {
    id: 4,
    page: 'repair',
    type: 'info',
    title: 'Information',
    message: 'info message',
    langCode: 'en',
    tenant: 'lanmaster'
  }, {
    id: 5,
    page: 'home',
    type: 'default',
    title: 'Default',
    message: 'Default message',
    langCode: 'en',
    tenant: 'lanmaster'
  }, {
    id: 6,
    page: 'repair',
    type: 'info',
    title: 'Information',
    message: 'info message',
    langCode: 'sv',
    tenant: 'lanmaster'
  }, {
    id: 7,
    page: 'repair',
    type: 'info',
    title: 'Information',
    message: 'info message',
    langCode: 'en',
    tenant: 'lanmaster'
  }];

  var AlertsApi = function () {
    function AlertsApi() {
      _classCallCheck(this, AlertsApi);
    }

    _createClass(AlertsApi, null, [{
      key: 'loadAlertsMock',
      value: function loadAlertsMock() {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve(Object.assign([], alerts));
          }, _delay2.default);
        });
      }
    }, {
      key: 'loadAlerts',
      value: function loadAlerts() {
        //TODO: integrate with real API
      }
    }, {
      key: 'loadAlertsForPageMock',
      value: function loadAlertsForPageMock(params) {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve(Object.assign([], alerts.filter(function (alert) {
              if (alert.page === params.page && alert.langCode === params.lancode) {
                alert.isVisible = true;
                return alert;
              }
            })));
          }, _delay2.default);
        });
      }
    }, {
      key: 'loadAlertsForPage',
      value: function loadAlertsForPage(params) {

        return (0, _axios2.default)({
          method: 'get',
          url: '' + _config2.default.alert.baseUrl + _config2.default.alert.version + _config2.default.alert.mapping,
          timeout: _config2.default.alert.timeout,
          params: _extends({}, params)
        }).then(function (response) {
          var alerts = response.data;

          if (alerts && Array.isArray(alerts)) {
            return alerts.map(function (alert) {
              alert.isVisible = true;
              return alert;
            });
          } else {
            return [];
          }
        }).catch(function (error) {
          throw error;
        });
      }
    }]);

    return AlertsApi;
  }();

  exports.default = AlertsApi;
});