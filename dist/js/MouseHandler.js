'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MouseHandler = (function () {
    function MouseHandler(game) {
        var _this = this;

        _classCallCheck(this, MouseHandler);

        this.game = game;

        // This object will follow the mouse.
        this.followMouse = null;

        // True if the player is placing a tower
        this.isPlacingTower = false;

        // Debug mode activated
        this.debugMode = false;
        this.debugDiv = [];

        // Activate debug mode
        $(window).on('keydown', function (evt) {
            if (evt.keyCode == 222) {
                _this.debugMode = !_this.debugMode;
                if (!_this.debugMode) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = _this.debugDiv[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var d = _step.value;

                            d.remove();
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator['return']) {
                                _iterator['return']();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            }
        });

        // Mouse move handler if the player selected a tower
        $(window).on('mousemove', function (evt) {
            if (_this.followMouse) {
                _this.isPlacingTower = true;

                // get nearest cell
                var c = _this.getNearestCell(evt);
                if (c) {
                    _this.followMouse.position.copyFrom(c.position);
                }
            }
        });

        // Debug click event
        $(window).on('click', function (evt) {
            if (_this.debugMode) {
                var obj = _this.getObject(evt);
                if (obj && obj.debug) {
                    var d = $("<div>").addClass('debug').css("top", evt.clientY).css("left", evt.clientX).text(obj.debug());

                    _this.debugDiv.push(d);
                    $("body").append(d);
                }
            }
        });

        // Mouse click handler when the tower should be placed
        $(window).on('click', function (evt) {
            if (_this.isPlacingTower && _this.followMouse) {

                var c = _this.getNearestCell(evt);
                if (c) {
                    // Affect cell to tower
                    _this.followMouse.cell = c;
                }

                // Remove tower from mousemove
                _this.followMouse = null;
                _this.isPlacingTower = false;
            }
        });
    }

    // Project the given screen coordinate into 3D world

    _createClass(MouseHandler, [{
        key: 'getWorldPosition',
        value: function getWorldPosition(evt) {
            // Update pointer coordinate
            this.game.scene._updatePointerPosition(evt);

            var scene = this.game.scene;
            var pr = scene.pick(scene._pointerX, scene._pointerY, function (mesh) {
                return mesh.name == "ground";
            }, false);
            if (pr.hit) {
                return pr.pickedPoint.clone();
            }
            return null;
        }

        /**
         * Returns the object clicked
         * @param evt The mouse event
         * @returns {Mesh} The selected mesh, null otherwise
         */
    }, {
        key: 'getObject',
        value: function getObject(evt) {
            // Update pointer coordinate
            this.game.scene._updatePointerPosition(evt);

            var scene = this.game.scene;
            var pr = scene.pick(scene._pointerX, scene._pointerY, null, false);
            if (pr.hit) {
                return pr.pickedMesh;
            }
            return null;
        }

        /**
         * Returns the nearest cell from the current mouse position
         * @param evt The mouse event
         * @returns null if there is no world position (scene.pick returns null), the nearest Cell otherwise
         */
    }, {
        key: 'getNearestCell',
        value: function getNearestCell(evt) {
            // Pick ground position according to the mouse cursor
            var worldPos = this.getWorldPosition(evt);
            if (worldPos) {
                return this.game.getNearestCell(worldPos);
            }
            return null;
        }
    }]);

    return MouseHandler;
})();
//# sourceMappingURL=MouseHandler.js.map
