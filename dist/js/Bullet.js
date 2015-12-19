"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bullet = (function (_GameObject) {
    _inherits(Bullet, _GameObject);

    function Bullet(game, position) {
        var _this = this;

        _classCallCheck(this, Bullet);

        _get(Object.getPrototypeOf(Bullet.prototype), "constructor", this).call(this, game);
        this.position = position;

        // A bullet is a simple sphere
        var vd = BABYLON.VertexData.CreateSphere({ diameter: 0.3 });
        vd.applyToMesh(this, false);

        // Direction by default is along the line
        this.direction = new BABYLON.Vector3(0.1, 0, 0);

        this.isVisible = true;

        // Set ready to avoid first frame collisions
        this.setReady();

        // The number of life points it removes to the hit enemy
        this.power = 1;

        var MAX_DIST = 15;

        // Move function
        this._move = function () {
            _this.moveWithCollisions(_this.direction);
            //destroy bullet if too far away
            if (_this.position.x >= MAX_DIST) {
                _this.destroy();
            }
        };
        this.getScene().registerBeforeRender(this._move);

        // Collision function
        this.onCollide = function (otherMesh) {
            // Collide only on enemies
            if (otherMesh instanceof Enemy) {
                // Collide only on waking enemies
                if (otherMesh.isWalking) {
                    otherMesh.destroy(_this.power);
                    _this.destroy();
                }
            }
        };
    }

    /**
     * Remove this bullet
     */

    _createClass(Bullet, [{
        key: "destroy",
        value: function destroy() {
            // Remove move function
            this.getScene().unregisterBeforeRender(this._move);
            // Remove the object
            this.dispose();
        }
    }]);

    return Bullet;
})(GameObject);
//# sourceMappingURL=Bullet.js.map
