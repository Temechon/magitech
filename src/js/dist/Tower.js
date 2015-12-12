"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tower = (function (_GameObject) {
        _inherits(Tower, _GameObject);

        function Tower(game) {
                _classCallCheck(this, Tower);

                var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tower).call(this, game));

                _this.position = BABYLON.Vector3.Zero();

                _this.isVisible = true;

                // A cell is a squared plane
                var vd = BABYLON.VertexData.CreateBox({ width: 1, height: 2, depth: 1 });
                vd.applyToMesh(_this, false);

                return _this;
        }

        return Tower;
})(GameObject);
//# sourceMappingURL=Tower.js.map
