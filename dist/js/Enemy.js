"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Enemy = (function (_GameObject) {
        _inherits(Enemy, _GameObject);

        function Enemy(game) {
                _classCallCheck(this, Enemy);

                _get(Object.getPrototypeOf(Enemy.prototype), "constructor", this).call(this, game);

                // An enemy belongs to a line (picked random at the start)
                this.line = 0; // get random here

                this.position = new BABYLON.Vector3(0, 0, 0);

                this.isVisible = true;

                // A cell is a squared plane
                var vd = BABYLON.VertexData.CreateSphere({ diameter: 1 });
                vd.applyToMesh(this, false);

                this.material = new BABYLON.StandardMaterial("", this.getScene());
                this.material.diffuseColor = BABYLON.Color3.Red();
        }

        return Enemy;
})(GameObject);
//# sourceMappingURL=Enemy.js.map
