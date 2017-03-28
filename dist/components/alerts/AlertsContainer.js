(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-addons-css-transition-group', 'redux', 'react-redux', 'react-cookie', './AlertDismissable', '../store/alerts', '../../api/config'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-addons-css-transition-group'), require('redux'), require('react-redux'), require('react-cookie'), require('./AlertDismissable'), require('../store/alerts'), require('../../api/config'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactAddonsCssTransitionGroup, global.redux, global.reactRedux, global.reactCookie, global.AlertDismissable, global.alerts, global.config);
    global.AlertsContainer = mod.exports;
  }
})(this, function (exports, _react, _reactAddonsCssTransitionGroup, _redux, _reactRedux, _reactCookie, _AlertDismissable, _alerts, _config) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

  var _reactCookie2 = _interopRequireDefault(_reactCookie);

  var _AlertDismissable2 = _interopRequireDefault(_AlertDismissable);

  var _config2 = _interopRequireDefault(_config);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var AlertsContainer = function (_Component) {
    _inherits(AlertsContainer, _Component);

    function AlertsContainer(props) {
      _classCallCheck(this, AlertsContainer);

      return _possibleConstructorReturn(this, (AlertsContainer.__proto__ || Object.getPrototypeOf(AlertsContainer)).call(this, props));
    }

    _createClass(AlertsContainer, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _props = this.props,
            loadAlertsForPage = _props.loadAlertsForPage,
            page = _props.page;


        loadAlertsForPage({
          page: page,
          tenant: _config2.default.tenant,
          lancode: _config2.default.defaultLanguage
        });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.props.removeAlertsFromStore();
      }
    }, {
      key: 'isAlertAlreadyClosed',
      value: function isAlertAlreadyClosed(alertId) {
        if (_reactCookie2.default.load(alertId)) {
          return true;
        }

        return false;
      }
    }, {
      key: 'dismissAlert',
      value: function dismissAlert(alertId) {
        _reactCookie2.default.save(alertId, alertId, { path: '/', maxAge: 86400 }); // this cookie will be expired in a day
        this.props.markAlertReadForSession(alertId);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var alerts = this.props.alerts;

        var dismissableAlerts = void 0;

        if (alerts && Array.isArray(alerts)) {
          dismissableAlerts = alerts.filter(function (alert) {
            if (alert.isVisible && !_this2.isAlertAlreadyClosed(alert.id)) {
              return alert;
            }
          }).map(function (alert) {
            return _react2.default.createElement(_AlertDismissable2.default, { key: alert.id, alert: alert, onDismiss: function onDismiss() {
                return _this2.dismissAlert(alert.id);
              } });
          });
        }

        return _react2.default.createElement(
          'div',
          { className: 'alert-container' },
          _react2.default.createElement(
            _reactAddonsCssTransitionGroup2.default,
            {
              transitionName: 'alert',
              transitionAppear: false,
              transitionEnterTimeout: 500,
              transitionLeaveTimeout: 300 },
            dismissableAlerts
          )
        );
      }
    }]);

    return AlertsContainer;
  }(_react.Component);

  AlertsContainer.propTypes = {
    alerts: _react.PropTypes.array,
    markAlertReadForSession: _react.PropTypes.func.isRequired,
    loadAlertsForPage: _react.PropTypes.func.isRequired,
    removeAlertsFromStore: _react.PropTypes.func.isRequired,
    page: _react.PropTypes.string.isRequired
  };

  function mapStateToProps(state) {
    return {
      alerts: state.alerts.alerts
    };
  }

  function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)({
      loadAlertsForPage: _alerts.loadAlertsForPage,
      markAlertReadForSession: _alerts.markAlertReadForSession,
      removeAlertsFromStore: _alerts.removeAlertsFromStore
    }, dispatch);
  }

  exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AlertsContainer);
});