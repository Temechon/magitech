"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Enemy = (function (_GameObject) {
    _inherits(Enemy, _GameObject);

    function Enemy(game) {
        var _this = this;

        _classCallCheck(this, Enemy);

        _get(Object.getPrototypeOf(Enemy.prototype), "constructor", this).call(this, game);

        this.name = "enemy";

        // An enemy belongs to a line (picked random at the start)
        this._line = null;

        this.position = new BABYLON.Vector3(0, 0, 0);

        this.isVisible = true;

        // An enemy is a simple sphere
        var vd = BABYLON.VertexData.CreateSphere({ diameter: 0.5 });
        vd.applyToMesh(this, false);

        this.material = new BABYLON.StandardMaterial("", this.getScene());
        this.material.diffuseColor = BABYLON.Color3.Red();

        // True if this enemy walks along the line
        this._isWalking = false;

        // Game loop : enemy walks, get bullets and diiiiie
        this.getScene().registerBeforeRender(function () {
            if (_this._isWalking) {
                // Increase the enemy position in -x
                _this.move();
            }
        });
    }

    _createClass(Enemy, [{
        key: "move",

        /**
         * Move this enemy during a tick
         */
        value: function move() {
            this.position.x -= 0.01;
        }
    }, {
        key: "debug",
        value: function debug() {
            return "walking : " + this._isWalking;
        }
    }, {
        key: "isWalking",
        set: function set(val) {
            this._isWalking = val;
            this._line.isHot = true;
        }

        // Returns the line attached to this enemy
    }, {
        key: "line",
        get: function get() {
            return this._line;
        },

        // Set the line attached to this enemy, and update its z position accordingly
        set: function set(line) {
            this._line = line;
            this.position.z = this._line.cells[0].position.z;
        }
    }]);

    return Enemy;
})(GameObject);
//# sourceMappingURL=Enemy.js.map
