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

        this.position = new BABYLON.Vector3(0, 0.5, 0);

        this.isVisible = true;

        // The life of this enemy
        this.lifePoints = 5;

        // An enemy is a simple sphere
        var vd = BABYLON.VertexData.CreateBox({ width: 0.5, height: 1, depth: 0.5 });
        vd.applyToMesh(this, false);

        this.material = new BABYLON.StandardMaterial("", this.getScene());
        this.material.diffuseColor = BABYLON.Color3.Red();

        // True if this enemy walks along the line
        this._isWalking = false;

        this.setReady();

        // Game loop : enemy walks, get bullets and diiiiie
        this._gameLoop = function () {
            if (_this._isWalking) {
                // Increase the enemy position in -x
                _this.move();
            }
        };
        this.getScene().registerBeforeRender(this._gameLoop);
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

        /**
         * Destroy this enemy. Parameter is the power of the bullet
         */
    }, {
        key: "destroy",
        value: function destroy(bulletPower) {

            // Decrease the poor guy life
            this.lifePoints -= bulletPower;
            // Todo hit animation ?

            if (this.lifePoints <= 0) {
                // Remove enemy from wave manager
                this.game.wave.removeEnemy(this);

                this.getScene().unregisterBeforeRender(this._gameLoop);
                this.dispose();
            }
        }
    }, {
        key: "isWalking",
        get: function get() {
            return this._isWalking;
        },
        set: function set(val) {
            this._isWalking = val;

            // Check collisions for bullets
            this.checkCollisions = val;
        }
    }]);

    return Enemy;
})(GameObject);
//# sourceMappingURL=Enemy.js.map
