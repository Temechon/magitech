// The function onload is loaded when the DOM has been loaded
window.addEventListener("DOMContentLoaded", function() {
    new Game('gamecanvas');
});


class Game {
    constructor(canvasId) {

        let canvas          = document.getElementById(canvasId);
        this.engine         = new BABYLON.Engine(canvas, true);

        // Contains all loaded assets needed for this state
        this.assets  = [];

        // The state scene
        this.scene   = null;

        // Resize window event
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
        this.run();

        this.gui = new Gui(this);

    }
    _initScene() {

        let scene = new BABYLON.Scene(this.engine);
        // Camera attached to the canvas
        let camera= new BABYLON.FreeCamera("cam", new BABYLON.Vector3(0, 10, -5), scene);
        camera.setTarget(new BABYLON.Vector3(0,0,0));
        camera.attachControl(this.engine.getRenderingCanvas());

        // Hemispheric light to light the scene
        let h = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0,1,0), scene);
        h.intensity = 0.9;
        return scene;
    }

    run() {

        this.scene = this._initScene();

        // The loader
        let loader =  new BABYLON.AssetsManager(this.scene);

        //    var meshTask = this.loader.addMeshTask("skull task", "", "./assets/", "block02.babylon");
        //    meshTask.onSuccess = this._initMesh;

        loader.onFinish = () => {

            // Init the game
            this._initGame();

            // The state is ready to be played
            this.isReady = true;

            this.engine.runRenderLoop(() => {
                this.scene.render();
            });
        };

        loader.load();
    }

    _initGame() {

        let box = BABYLON.Mesh.CreateBox("", 1, this.scene);

        let pos = BABYLON.Vector3.Zero();
        for (let l=0; l<5; l++) {
            new Line(this, 10, pos);
            pos.z += 1;
        }


        this.scene.debugLayer.show();
    }

    createTower() {
        // Create tower
        let tower = new Tower(this);

        // Make tower follow mouse cursor

    }

}
