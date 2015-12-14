"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameObject = (function (_BABYLON$Mesh) {
    _inherits(GameObject, _BABYLON$Mesh);

    function GameObject(game) {
        _classCallCheck(this, GameObject);

        _get(Object.getPrototypeOf(GameObject.prototype), "constructor", this).call(this, "__go__", game.scene);
        this.game = game;

        // The game object is not visible
        this.isVisible = false;

        // A game object can have several children
        this._children = [];

        // tag
        BABYLON.Tags.AddTagsTo(this, "__go__");
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
