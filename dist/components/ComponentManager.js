(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './alerts/AlertsContainer', '../constants/components'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./alerts/AlertsContainer'), require('../constants/components'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.AlertsContainer, global.components);
    global.ComponentManager = mod.exports;
  }
})(this, function (exports, _react, _AlertsContainer, _components) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _AlertsContainer2 = _interopRequireDefault(_AlertsContainer);

  var ComponentTypes = _interopRequireWildcard(_components);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

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

  var ComponentManager = function (_Component) {
    _inherits(ComponentManager, _Component);

    function ComponentManager(props) {
      _classCallCheck(this, ComponentManager);

      return _possibleConstructorReturn(this, (ComponentManager.__proto__ || Object.getPrototypeOf(ComponentManager)).call(this, props));
    }

    _createClass(ComponentManager, [{
      key: 'render',
      value: function render() {
        console.log(this.props);

        switch (this.props.name) {
          case ComponentTypes.COMPONENT_ALERT:
            return _react2.default.createElement(_AlertsContainer2.default, this.props);
            break;
          default:
            return 'No component found for the provided name: ' + this.props.name;
        }
      }
    }]);

    return ComponentManager;
  }(_react.Component);

  ComponentManager.propTypes = {
    motif: _react.PropTypes.object.isRequired,
    name: _react.PropTypes.string.isRequired
  };

  exports.default = ComponentManager;
});