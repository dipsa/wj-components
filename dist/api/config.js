(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.config = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = config = {
    tenant: "lanmaster",
    defaultLanguage: "sv",
    alert: {
      baseUrl: "https://apigw.ebuilder.io/webjourney-notify/",
      version: "v1-0",
      mapping: "/alert",
      timeout: 3000
    }
  };
});