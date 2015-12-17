class Bullet extends GameObject{

    constructor (game, position) {
        super(game);
        this.position = position;

        // A bullet is a simple sphere
        let vd = BABYLON.VertexData.CreateSphere({diameter: 0.3});
        vd.applyToMesh(this, false);

        // Direction by default is along the line
        this.direction = new BABYLON.Vector3(0.1,0,0);

        this.isVisible = true;

        // Set ready to avoid first frame collisions
        this.setReady();

        // Move function
        this._move = () => {
            this.moveWithCollisions(this.direction);
            //this.position.addInPlace(this.direction);
        };
        this.getScene().registerBeforeRender(this._move);

        // Collision function
        this.onCollide = (otherMesh) => {
            otherMesh.destroy();
            this.destroy();
        }

    }

    /**
     * Remove this bullet
     */
    destroy () {
        // Remove move function
        this.getScene().unregisterBeforeRender(this._move);
        // Temove the object
        this.dispose();

    }
}