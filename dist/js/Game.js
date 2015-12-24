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

        // Game GUI
        this.gui = new Gui(this);

        // Assets loader - define in the this.run()
        this.loader = null;

        // Handle mouse actions
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

        // Tower builder peasant
        this.towerFactory = new TowerFactory(this);

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

            // Init several materials used by cells and others
            this._initMaterials(scene);

            // Hemispheric light to light the scene
            var h = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
            h.intensity = 0.9;
            return scene;
        }
    }, {
        key: "run",
        value: function run() {
            var _this2 = this;

            // Init the scene
            this.scene = this._initScene();

            this.loader = new Loader(this);

            // Rune the loader
            this.loader.onFinish = function () {

                // Init the game
                _this2._initGame();

                _this2.engine.runRenderLoop(function () {
                    _this2.scene.render();
                });
            };

            // Start it!
            this.loader.load();
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

            // Update the GUI the first time
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

            var t = this.towerFactory.build(name);
            // Check if player can buy this tower
            if (t && this._gold - t.cost >= 0) {
                // Create tower
                t.build();

                // Decrease gold amount
                this.towers.push(t);
                this.gold -= t.cost;

                // Make tower follow mouse cursor
                this.mouse.followMouse = t;
            } else {}
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
         * Update the GUI
         */
    }, {
        key: "updateGui",
        value: function updateGui() {
            this.gui.refresh();
        }

        /**
         * Init materials used by cells
         */
    }, {
        key: "_initMaterials",
        value: function _initMaterials(scene) {
            var darkColors = randomColor({ hue: 'purple', luminosity: 'dark', count: 2 });
            var lightColors = randomColor({ hue: 'purple', luminosity: 'light', count: 2 });

            var dark1 = new BABYLON.StandardMaterial("dark1", scene);
            dark1.diffuseColor = BABYLON.Color3.FromHexString(darkColors[0]);
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
