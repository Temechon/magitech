class Enemy extends GameObject{

    constructor(game) {
        super(game);

        this.name = "enemy";

        this.position = new BABYLON.Vector3(0,0.5,0);

        this.isVisible = true;

        // The life of this enemy
        this.lifePoints = 5;

        // An enemy is a simple sphere
        var vd = BABYLON.VertexData.CreateBox({width:0.5, height:1, depth:0.5});
        vd.applyToMesh(this, false);

        this.material = new BABYLON.StandardMaterial("", this.getScene());
        this.material.diffuseColor = BABYLON.Color3.Red();

        // True if this enemy walks along the line
        this._isWalking = false;

        this.setReady();

        // Game loop : enemy walks, get bullets and diiiiie
        this._gameLoop = () => {
            if (this._isWalking) {
                // Increase the enemy position in -x
                this.move();
            }
        };
        this.getScene().registerBeforeRender(this._gameLoop);
    }

    get isWalking() {
        return this._isWalking;
    }

    set isWalking(val) {
        this._isWalking = val;

        // Check collisions for bullets
        this.checkCollisions = val;
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
     * Destroy this enemy. Parameter is the power of the bullet
     */
    destroy(bulletPower) {

        // Decrease the poor guy life
        this.lifePoints -= bulletPower;
        // Todo hit animation ?

        if (this.lifePoints <= 0) {
            // Remove enemy from wave manager
            this.game.wave.removeEnemy(this);

            this.getScene().unregisterBeforeRender(this._gameLoop);
            this.dispose();
        }
    }




}