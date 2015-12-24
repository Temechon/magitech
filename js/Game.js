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

        // Init the scene
        this.scene = this._initScene();

        this.loader = new Loader(this);

        // Rune the loader
        this.loader.onFinish = () => {

            // Init the game
            this._initGame();

            this.engine.runRenderLoop(() => {
                this.scene.render();
            });
        };

        // Start it!
        this.loader.load();
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

        // Update the GUI the first time
        this.updateGui();

        window.addEventListener("keydown", (evt) => {
            if (evt.keyCode == 32) {
                if (this.scene.debugLayer._enabled) {
                    this.scene.debugLayer.hide();
                } else {
                    this.scene.debugLayer.show();
                }
            }
        });
    }

    /**
     * Create a tower if enough gold. The given parameter is the tower name,
     * to be link with the config object
     */
    createTower(name) {

        let t = this.towerFactory.build(name);
         // Check if player can buy this tower
        if (t && this._gold - t.cost >= 0) {
            // Create tower
            t.build();

            // Decrease gold amount
            this.towers.push(t);
            this.gold -= t.cost;

            // Make tower follow mouse cursor
            this.mouse.followMouse = t;
        } else {

        }

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

    /**
     * Update the GUI
     */
    updateGui() {
        this.gui.refresh();
    }

    /*** GETTER SETTER **/
    get gold() {
        return this._gold;
    }
    set gold(value) {
        this._gold = value;
        this.updateGui();
    }
}
