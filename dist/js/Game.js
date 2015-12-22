"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var count = 0;
// The function onload is loaded when the DOM has been loaded
window.addEventListener("DOMContentLoaded", function () {
    new Game('gamecanvas');
    console.log("coucou", count++);
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

        // Contains all towers in the battlefield
        this.towers = [];

        // The wave manager of this game: send enemies
        this.wave = new WaveManager(this);

        // The total gold available to the player
        this._gold = 100;

        // The configuration object of the game
        this.config = new Config();

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
            var _this3 = this;

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

            this.updateGui();
            window.addEventListener("keydown", function (evt) {
                if (evt.keyCode == 32) {
                    if (_this3.scene.debugLayer._enabled) {
                        _this3.scene.debugLayer.hide();
                    } else {
                        _this3.scene.debugLayer.show();
                    }
                }
            });
        }

        /**
         * Create a tower if enough gold. The given parameter is the tower name,
         * to be link with the config object
         */
    }, {
        key: "createTower",
        value: function createTower(name) {
            // Get tower type
            if (this.config.towers[name]) {
                console.log("YEAAAH", name);
            }

            // Check gold
            //if (this._gold > 0) {
            //    // Create tower
            //    let tower = new Tower(this);
            //    this.towers.push(tower);
            //    this.gold -= 25;
            //
            //    // Make tower follow mouse cursor
            //    this.mouse.followMouse = tower;
            //}
        }

        /**
         * Returns the nearest cell position from the given world position
         */
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
    }, {
        key: "sendWave",
        value: function sendWave() {
            this.wave.sendWave();
        }

        /**
         * Returns a random line z position
         */
    }, {
        key: "getRandomLine",
        value: function getRandomLine() {
            var randomNumber = function randomNumber(min, max) {
                if (min === max) {
                    return min;
                }
                var random = Math.random();
                return Math.floor(random * (max - min) + min);
            };

            return this.lines[randomNumber(0, this.lines.length)];
        }

        /**
         * Returns the line corresponding to the given id
         */
    }, {
        key: "getLineById",
        value: function getLineById(id) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.lines[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var l = _step3.value;

                    if (id == l.id) {
                        return l;
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                        _iterator3["return"]();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return null;
        }

        /**
         * Update the GUI
         */
    }, {
        key: "updateGui",
        value: function updateGui() {
            this.gui.refresh();
        }

        /*** GETTER SETTER **/
    }, {
        key: "gold",
        get: function get() {
            return this._gold;
        },
        set: function set(value) {
            this._gold = value;
            this.updateGui();
        }
    }]);

    return Game;
})();
//# sourceMappingURL=Game.js.map
