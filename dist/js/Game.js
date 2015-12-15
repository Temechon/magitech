// The function onload is loaded when the DOM has been loaded
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.addEventListener("DOMContentLoaded", function () {
    new Game('gamecanvas');
});

var Game = (function () {
    function Game(canvasId) {
        var _this = this;

        _classCallCheck(this, Game);

        var canvas = document.getElementById(canvasId);
        this.engine = new BABYLON.Engine(canvas, true);

        // Contains all loaded assets needed for this state
        this.assets = [];

        // The state scene
        this.scene = null;

        this.gui = new Gui(this);
        this.mouse = new MouseHandler(this);
        // Contains the x lines of the game
        this.lines = [];

        // The wave manager of this game: send enemies
        this.wave = new WaveManager(this);

        // Resize window event
        window.addEventListener("resize", function () {
            _this.engine.resize();
        });
        this.run();
    }

    _createClass(Game, [{
        key: "_initScene",
        value: function _initScene() {

            var scene = new BABYLON.Scene(this.engine);
            // Camera attached to the canvas
            var camera = new BABYLON.FreeCamera("cam", new BABYLON.Vector3(4.4, 8, -2.5), scene);
            camera.rotation = new BABYLON.Vector3(1, 0, 0);
            camera.attachControl(this.engine.getRenderingCanvas());

            // Hemispheric light to light the scene
            var h = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
            h.intensity = 0.9;
            return scene;
        }
    }, {
        key: "run",
        value: function run() {
            var _this2 = this;

            this.scene = this._initScene();

            // The loader
            var loader = new BABYLON.AssetsManager(this.scene);

            //    var meshTask = this.loader.addMeshTask("skull task", "", "./assets/", "block02.babylon");
            //    meshTask.onSuccess = this._initMesh;

            loader.onFinish = function () {

                // Init the game
                _this2._initGame();

                // The state is ready to be played
                _this2.isReady = true;

                _this2.engine.runRenderLoop(function () {
                    _this2.scene.render();
                });
            };

            loader.load();
        }
    }, {
        key: "_initGame",
        value: function _initGame() {

            // Create ground
            var plane = BABYLON.Mesh.CreateGround("ground", 25, 25, 1, this.scene);
            plane.material = new BABYLON.StandardMaterial("", this.scene);
            plane.material.specularColor = BABYLON.Color3.Black();
            plane.material.diffuseTexture = new BABYLON.Texture("assets/ground.jpg", this.scene);
            plane.material.diffuseTexture.uScale = plane.material.diffuseTexture.vScale = 10;
            plane.material.zOffset = 1;

            var pos = BABYLON.Vector3.Zero();
            for (var l = 0; l < 5; l++) {
                this.lines.push(new Line(this, 10, pos));
                pos.z += 1;
            }

            this.scene.debugLayer.show();
        }
    }, {
        key: "createTower",
        value: function createTower() {
            // Create tower
            var tower = new Tower(this);
            // Make tower follow mouse cursor
            this.mouse.followMouse = tower;
        }

        // Returns the nearest cell position from the given world position
    }, {
        key: "getNearestCell",
        value: function getNearestCell(worldPosition) {
            var min = this.lines[0].cells[0]; // minimum is the first cell by default
            var mindist = BABYLON.Vector3.DistanceSquared(min.position, worldPosition);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var l = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = l.cells[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var c = _step2.value;

                            var currentMinDist = BABYLON.Vector3.DistanceSquared(c.position, worldPosition);
                            if (currentMinDist <= mindist) {
                                mindist = currentMinDist;
                                min = c;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                                _iterator2["return"]();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                        _iterator["return"]();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return min;
        }
    }]);

    return Game;
})();
//# sourceMappingURL=Game.js.map
