"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
        Constructor;
    };
}(), VERSION = 1, AUTHOR = "temechon@pixelcodr.com";

window.addEventListener("DOMContentLoaded", function() {
    new Game("gamecanvas");
});

var Game = function() {
    function Game(canvasId) {
        var _this = this;
        _classCallCheck(this, Game);
        var canvas = document.getElementById(canvasId);
        this.engine = new BABYLON.Engine(canvas, !0), this.assets = [], this.scene = null, 
        window.addEventListener("resize", function() {
            _this.engine.resize();
        }), this.run();
    }
    return _createClass(Game, [ {
        key: "_initScene",
        value: function() {
            var scene = new BABYLON.Scene(this.engine), camera = new BABYLON.FreeCamera("cam", new BABYLON.Vector3(0, 30, -30), scene);
            camera.setTarget(new BABYLON.Vector3(0, 0, 0)), camera.attachControl(this.engine.getRenderingCanvas());
            var h = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
            return h.intensity = .9, scene;
        }
    }, {
        key: "run",
        value: function() {
            var _this2 = this;
            this.scene = this._initScene();
            var loader = new BABYLON.AssetsManager(this.scene);
            loader.onFinish = function() {
                _this2._initGame(), _this2.isReady = !0, _this2.engine.runRenderLoop(function() {
                    _this2.scene.render();
                });
            }, loader.load();
        }
    }, {
        key: "_initGame",
        value: function() {
            BABYLON.Mesh.CreateBox("box", 2, this.scene), this.scene.debugLayer.show();
        }
    } ]), Game;
}();