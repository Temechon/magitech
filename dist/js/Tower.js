"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tower = (function (_GameObject) {
    _inherits(Tower, _GameObject);

    function Tower(game) {
        var _this = this;

        _classCallCheck(this, Tower);

        _get(Object.getPrototypeOf(Tower.prototype), "constructor", this).call(this, game);

        this.position = BABYLON.Vector3.Zero();

        this.isVisible = true;

        // The current cell of the tower. Null at start because the tower is not placed
        this._cell = null;

        // True if the tower start to shoot, false otherwise
        this.isActivated = false;

        // This tower will shoot every xx ms
        this.shootCadency = 500;

        // Timer repeat indefinitely, each 500ms
        this.timer = new Timer(500, this.getScene(), { repeat: -1, autostart: true });
        this.timer.callback = function () {
            _this.shoot();
        };

        // A cell is a squared plane
        var vd = BABYLON.VertexData.CreateBox({ width: 1, height: 2, depth: 1 });
        vd.applyToMesh(this, false);
    }

    /**
     * Display debug information on the screen
     * @returns {string}
     */

    _createClass(Tower, [{
        key: "debug",
        value: function debug() {
            return "is activated : " + this.isActivated;
        }

        /**
         * Link the given cell to this tower
         * @param cell
         */
    }, {
        key: "unlinkCell",

        /**
         * Unlink the cell from this tower
         */
        value: function unlinkCell() {
            if (this._cell) {
                this._cell.tower = null;
            }
            this._cell = null;

            // deactivate tower
            this.isActivated = false;
        }

        /**
         * Fire a bullet if there is at least one enemy in sight
         */
    }, {
        key: "shoot",
        value: function shoot() {
            if (this.isActivated) {
                console.log("SHOOTING!!");
            }
        }
    }, {
        key: "cell",
        set: function set(cell) {
            this._cell = cell;
            this._cell.tower = this;

            // If the corresponding line is hot, activate this tower
            if (this._cell.line.isHot) {
                this.isActivated = true;
            }
        }
    }]);

    return Tower;
})(GameObject);
//# sourceMappingURL=Tower.js.map
