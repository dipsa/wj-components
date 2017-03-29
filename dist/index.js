(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './components/ComponentManager', './store/alerts'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./components/ComponentManager'), require('./store/alerts'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.ComponentManager, global.alerts);
    global.index = mod.exports;
  }
})(this, function (exports, _ComponentManager, _alerts) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.removeAlertsFromStore = exports.markAlertReadForSession = exports.loadAlertsForPageAjaxSuccess = exports.loadAlertsForPage = exports.loadAlertsAjaxSuccess = exports.loadAlerts = exports.reducer = exports.types = exports.actions = undefined;

  var _ComponentManager2 = _interopRequireDefault(_ComponentManager);

  var _alerts2 = _interopRequireDefault(_alerts);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.actions = _alerts.actions;
  exports.types = _alerts.types;
  exports.reducer = _alerts2.default;
  exports.loadAlerts = _alerts.loadAlerts;
  exports.loadAlertsAjaxSuccess = _alerts.loadAlertsAjaxSuccess;
  exports.loadAlertsForPage = _alerts.loadAlertsForPage;
  exports.loadAlertsForPageAjaxSuccess = _alerts.loadAlertsForPageAjaxSuccess;
  exports.markAlertReadForSession = _alerts.markAlertReadForSession;
  exports.removeAlertsFromStore = _alerts.removeAlertsFromStore;
  exports.default = _ComponentManager2.default;
});