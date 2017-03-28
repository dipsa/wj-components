(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../api/alertsApi'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../api/alertsApi'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.alertsApi);
    global.alerts = mod.exports;
  }
})(this, function (exports, _alertsApi) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.types = exports.actions = undefined;
  exports.loadAlerts = loadAlerts;
  exports.loadAlertsAjaxSuccess = loadAlertsAjaxSuccess;
  exports.loadAlertsForPage = loadAlertsForPage;
  exports.loadAlertsForPageAjaxSuccess = loadAlertsForPageAjaxSuccess;
  exports.markAlertReadForSession = markAlertReadForSession;
  exports.removeAlertsFromStore = removeAlertsFromStore;

  var _alertsApi2 = _interopRequireDefault(_alertsApi);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // array to keep the alert objects
  var INITIAL_STATE = {};

  var LOAD_ALERTS = 'LOAD_ALERTS';
  var LOAD_ALERTS_AJAX_SUCCESS = 'LOAD_ALERTS_AJAX_SUCCESS';
  var LOAD_ALERTS_PER_PAGE = 'LOAD_ALERTS_PER_PAGE';
  var LOAD_ALERTS_PER_PAGE_AJAX_SUCCESS = 'LOAD_ALERTS_PER_PAGE_AJAX_SUCCESS';
  var MARK_ALERT_READ_FOR_SESSION = 'MARK_ALERT_READ_FOR_SESSION';
  var REMOVE_ALERTS_FROM_STORE = 'REMOVE_ALERTS_FROM_STORE';

  // This action is to load all the alerts once and keep them in the store.
  // if page=by-page loading is required when loading all the alerts is cumbersome
  // fallback to below loadAlertsForPage function
  function loadAlerts() {
    return function (dispatch) {
      return _alertsApi2.default.loadAlertsMock().then(function (alerts) {
        dispatch(loadAlertsAjaxSuccess(alerts));
      }).catch(function (error) {
        throw error;
      });
    };
  }

  function loadAlertsAjaxSuccess(alerts) {
    return { type: LOAD_ALERTS_AJAX_SUCCESS, alerts: alerts };
  }

  //This action is to load all the alerts specific to a single page.
  // Preferred way of loading alerts
  function loadAlertsForPage(params) {
    return function (dispatch) {
      return _alertsApi2.default.loadAlertsForPage(params).then(function (alerts) {
        dispatch(loadAlertsForPageAjaxSuccess(alerts));
      }).catch(function (error) {
        throw error;
      });
    };
  }

  function loadAlertsForPageAjaxSuccess(alerts) {
    return { type: LOAD_ALERTS_PER_PAGE_AJAX_SUCCESS, alerts: alerts };
  }

  // This action is responsible for marking the alert is read by the user and will hide it during the current session.
  // Fallback for cookie disabled browsers.
  function markAlertReadForSession(alertId) {
    return { type: MARK_ALERT_READ_FOR_SESSION, alertId: alertId };
  }

  // This action is to flush the alerts from the store when the component unmounts from the DOM.
  // Good Housekeeping.
  function removeAlertsFromStore() {
    return { type: REMOVE_ALERTS_FROM_STORE };
  }

  var actions = exports.actions = {
    loadAlerts: loadAlerts,
    loadAlertsAjaxSuccess: loadAlertsAjaxSuccess,
    loadAlertsForPage: loadAlertsForPage,
    loadAlertsForPageAjaxSuccess: loadAlertsForPageAjaxSuccess,
    markAlertReadForSession: markAlertReadForSession,
    removeAlertsFromStore: removeAlertsFromStore
  };

  var types = exports.types = {
    LOAD_ALERTS: LOAD_ALERTS,
    LOAD_ALERTS_AJAX_SUCCESS: LOAD_ALERTS_AJAX_SUCCESS,
    LOAD_ALERTS_PER_PAGE: LOAD_ALERTS_PER_PAGE,
    LOAD_ALERTS_PER_PAGE_AJAX_SUCCESS: LOAD_ALERTS_PER_PAGE_AJAX_SUCCESS,
    MARK_ALERT_READ_FOR_SESSION: MARK_ALERT_READ_FOR_SESSION,
    REMOVE_ALERTS_FROM_STORE: REMOVE_ALERTS_FROM_STORE
  };

  // Alerts Reducer

  exports.default = function () {
    return function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
      var action = arguments[1];

      switch (action.type) {
        case LOAD_ALERTS_AJAX_SUCCESS:
          return Object.assign({}, state, { alerts: action.alerts });
        case LOAD_ALERTS_PER_PAGE_AJAX_SUCCESS:
          return Object.assign({}, state, { alerts: action.alerts });
        case MARK_ALERT_READ_FOR_SESSION:
          {
            var newAlerts = state.alerts.map(function (alert) {
              if (alert.id === action.alertId) {
                return Object.assign({}, alert, { isVisible: false });
              } else {
                return alert;
              }
            });

            return Object.assign({}, state, { alerts: newAlerts });
          }
        case REMOVE_ALERTS_FROM_STORE:
          return [];

        default:
          return state;
      }
    };
  };
});