/**
 * Load all assets needed for the game.
 * Maybe in the future will display a custom loading screen with some funny messages. Why not.
 *
 * For each task, this loader add
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Loader = (function () {
    function Loader(game) {
        _classCallCheck(this, Loader);

        this.game = game;

        // Assets manager
        this._loader = new BABYLON.AssetsManager(this.game.scene);

        this._addMesh('generator');
        this._addMesh('shooter');
    }

    /**
     * Add a mesh task to the loader. Should be finished by adding animations
     */

    _createClass(Loader, [{
        key: '_addMesh',
        value: function _addMesh(name) {
            var _this = this;

            // Add the mesh task given by its name to the loader
            var meshTask = this._loader.addMeshTask(name, '', './assets/models/' + name + '/', name + '.babylon');
            meshTask.onSuccess = function (objects) {

                // All meshes are disabled at start
                objects.loadedMeshes.forEach(function (mesh) {
                    mesh.setEnabled(false);
                });
                _this.game.assets[name] = objects.loadedMeshes;
            };
        }

        // Start the loader
    }, {
        key: 'load',
        value: function load() {
            this._loader.load();
        }
    }, {
        key: 'onFinish',
        set: function set(func) {
            this._loader.onFinish = func;
        }
    }]);

    return Loader;
})();
//# sourceMappingURL=Loader.js.map
