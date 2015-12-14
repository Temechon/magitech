"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MouseHandler = (function () {
    function MouseHandler(game) {
        var _this = this;

        _classCallCheck(this, MouseHandler);

        this.game = game;

        // This object will follow the mouse
        this.followMouse = null;

        $(window).mousemove(function (evt) {
            if (_this.followMouse) {
                // Update pointer coordinate
                _this.game.scene._updatePointerPosition(evt);
                // Pick ground position according to the mouse cursor
                var worldPos = _this.getWorldPosition();
                if (worldPos) {
                    var c = _this.game.getNearestCell(worldPos);
                    _this.followMouse.position.copyFrom(c.position);
                }
            }
        });
    }

    // Project the given screen coordinate into 3D world

    _createClass(MouseHandler, [{
        key: "getWorldPosition",
        value: function getWorldPosition() {
            var scene = this.game.scene;
            var pr = scene.pick(scene._pointerX, scene._pointerY, function (mesh) {
                return mesh.name == "ground";
            }, false);
            if (pr.hit) {
                return pr.pickedPoint.clone();
            }
            return null;
        }
    }]);

    return MouseHandler;
})();
//# sourceMappingURL=MouseHandler.js.map
