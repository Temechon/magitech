"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameObject = (function (_BABYLON$Mesh) {
    _inherits(GameObject, _BABYLON$Mesh);

    function GameObject(game) {
        _classCallCheck(this, GameObject);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GameObject).call(this, "__go__", game.scene));

        _this.game = game;

        // The game object is not visible
        _this.isVisible = false;

        // A game object can have several children
        _this._children = [];

        // tag
        BABYLON.Tags.AddTagsTo(_this, "__go__");
        return _this;
    }

    _createClass(GameObject, [{
        key: "setReady",
        value: function setReady() {
            this.computeWorldMatrix(true);
            this._children.forEach(function (child) {
                child.computeWorldMatrix(true);
            });
        }
    }, {
        key: "addChildren",
        value: function addChildren(child) {
            child.parent = this;
            this._children.push(child);
        }
    }, {
        key: "isCollidingWith",
        value: function isCollidingWith(other) {
            // If other is a gameobject, collide each children
            if (BABYLON.Tags.MatchesQuery(other, "__go__")) {
                for (var i = 0; i < this._children.length; i++) {
                    for (var j = 0; j < other._children.length; j++) {
                        if (this._children[i].intersectsMesh(other._children[j], true)) {
                            return true;
                        }
                    }
                }
            } else {
                // Otherwise, collide each children with other
                for (i = 0; i < this._children.length; i++) {
                    if (this._children[i].intersectsMesh(other, true)) {
                        return true;
                    }
                }
            }
        }
    }]);

    return GameObject;
})(BABYLON.Mesh);
//# sourceMappingURL=GameObject.js.map
