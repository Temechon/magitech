/**
 * The configuration object of this game
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = (function () {
    function Config() {
        _classCallCheck(this, Config);

        // Contains all towers
        this.towers = [];
        this._tower("shooter", 25);
        this._tower("generator", 50);
    }

    // Create a tower config object

    _createClass(Config, [{
        key: "_tower",
        value: function _tower(name, price) {
            this.towers[name] = {
                price: price
            };
        }
    }]);

    return Config;
})();
//# sourceMappingURL=Config.js.map
