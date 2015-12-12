"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gui = (function () {
    function Gui(game) {
        _classCallCheck(this, Gui);

        this.game = game;

        this.towerButton = $("#tower1");
        this.addAction();
    }

    _createClass(Gui, [{
        key: "addAction",
        value: function addAction() {
            var _this = this;

            this.towerButton.click(function () {
                _this.game.createTower();
            });
        }
    }]);

    return Gui;
})();
//# sourceMappingURL=Gui.js.map
