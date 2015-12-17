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

        this.gui = new Gui(this);
        this.mouse = new MouseHandler(this);
        // Contains the x lines of the game
        this.lines = [];

        // Contains all towers in the battlefield
        this.towers = [];

        // The wave manager of this game: send enemies
        this.wave = new WaveManager(this);

        // Resize window event
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
        this.run();

    }
    _initScene() {

        let scene = new BABYLON.Scene(this.engine);
        // Camera attached to the canvas
        let camera= new BABYLON.FreeCamera("cam", new BABYLON.Vector3(4.4, 8, -2.5), scene);
        camera.rotation = new BABYLON.Vector3(1, 0, 0);
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

        // Create ground
        let plane = BABYLON.Mesh.CreateGround("ground", 25, 25, 1, this.scene);
        plane.material = new BABYLON.StandardMaterial("", this.scene);
        plane.material.specularColor = BABYLON.Color3.Black();
        plane.material.diffuseTexture = new BABYLON.Texture("assets/ground.jpg", this.scene);
        plane.material.diffuseTexture.uScale = plane.material.diffuseTexture.vScale = 10;
        plane.material.zOffset = 1;


        let pos = BABYLON.Vector3.Zero();
        for (let l=0; l<5; l++) {
            this.lines.push(new Line(this, 10, pos));
            pos.z += 1;
        }


        this.scene.debugLayer.show();
    }

    /**
     * Create a tower!
     */
    createTower() {
        // Create tower
        let tower = new Tower(this);
        this.towers.push(tower);
        // Make tower follow mouse cursor
        this.mouse.followMouse = tower;
    }

    /**
     * Returns the nearest cell position from the given world position
     */
    getNearestCell(worldPosition) {
        let min = this.lines[0].cells[0]; // minimum is the first cell by default
        let mindist = BABYLON.Vector3.DistanceSquared(min.position, worldPosition);


        for (let l of this.lines) {
            for (let c of l.cells) {
                let currentMinDist = BABYLON.Vector3.DistanceSquared(c.position, worldPosition);
                if ( currentMinDist <= mindist) {
                    mindist = currentMinDist;
                    min = c;
                }
            }
        }
        return min;
    }

    sendWave() {
        this.wave.sendWave();
    }

    /**
     * Returns a random line z position
     */
    getRandomLine() {
        let randomNumber = function (min, max) {
            if (min === max) {
                return (min);
            }
            var random = Math.random();
            return Math.floor(((random * (max - min)) + min));
        };

        return this.lines[randomNumber(0, this.lines.length)];
    }
}
