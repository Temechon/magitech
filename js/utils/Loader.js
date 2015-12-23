/**
 * Load all assets needed for the game.
 * Maybe in the future will display a custom loading screen with some funny messages. Why not.
 *
 * For each task, this loader add
 */
class Loader {

    constructor (game) {
        this.game = game;

        // Assets manager
        this._loader = new BABYLON.AssetsManager(this.game.scene);

        this._addMesh('generator');
        this._addMesh('shooter');
    }

    /**
     * Add a mesh task to the loader. Should be finished by adding animations
     */
    _addMesh(name) {
        // Add the mesh task given by its name to the loader
        let meshTask = this._loader.addMeshTask(name, '', `./assets/models/${name}/`, `${name}.babylon`);
        meshTask.onSuccess = (objects) => {

            // All meshes are disabled at start
            objects.loadedMeshes.forEach((mesh) => {
                mesh.setEnabled(false);
            });
            this.game.assets[name] = objects.loadedMeshes;
        };
    }

    // Start the loader
    load() {
        this._loader.load();
    }

    set onFinish(func) {
        this._loader.onFinish = func;
    }
}