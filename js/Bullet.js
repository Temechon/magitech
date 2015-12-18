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

        const MAX_DIST = 20;

        // Move function
        this._move = () => {
            this.moveWithCollisions(this.direction);
            //destroy bullet if too far away
            if (this.position.x >= MAX_DIST) {
                this.destroy();
            }
        };
        this.getScene().registerBeforeRender(this._move);

        // Collision function
        this.onCollide = (otherMesh) => {
            // Collide only on enemies
            if (otherMesh instanceof Enemy) {
                // Collide only on waking enemies
                if (otherMesh.isWalking) {
                    otherMesh.destroy(); // TODO remove life point of the enemy
                    this.destroy();
                }
            }
        }
    }

    /**
     * Remove this bullet
     */
    destroy () {
        // Remove move function
        this.getScene().unregisterBeforeRender(this._move);
        // Remove the object
        this.dispose();
    }
}