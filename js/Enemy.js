class Enemy extends GameObject{

    constructor(game) {
        super(game);

        this.name = "enemy";

        // An enemy belongs to a line (picked random at the start)
        this._line = null;

        this.position = new BABYLON.Vector3(0,0.5,0);

        this.isVisible = true;

        // An enemy is a simple sphere
        var vd = BABYLON.VertexData.CreateBox({width:0.5, height:1, depth:0.5});
        vd.applyToMesh(this, false);

        this.material = new BABYLON.StandardMaterial("", this.getScene());
        this.material.diffuseColor = BABYLON.Color3.Red();

        // True if this enemy walks along the line
        this._isWalking = false;

        this.setReady();

        // Check collisions for bullets
        this.checkCollisions = true;

        // Game loop : enemy walks, get bullets and diiiiie
        this._gameLoop = () => {
            if (this._isWalking) {
                // Increase the enemy position in -x
                this.move();
            }
        };
        this.getScene().registerBeforeRender(this._gameLoop);
    }

    set isWalking(val) {
        this._isWalking = val;
        this._line.isHot = true;
    }

    // Returns the line attached to this enemy
    get line() {
        return this._line;
    }

    // Set the line attached to this enemy, and update its z position accordingly
    set line(line) {
        this._line = line;
        this.position.z = this._line.cells[0].position.z;
    }

    /**
     * Move this enemy during a tick
     */
    move () {
        this.position.x -= 0.01;
    }

    debug() {
        return `walking : ${this._isWalking}`
    }

    /**
     * Destroy this enemy
     */
    destroy() {
        this.getScene().unregisterBeforeRender(this._gameLoop);
        this.dispose();
    }




}