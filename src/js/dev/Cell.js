class Cell extends GameObject{

    constructor(game) {
        super(game);

        this.position = BABYLON.Vector3.Zero();
        this.size = 1;

        this.isVisible = true;

        // A cell is a squared plane
        var vd = BABYLON.VertexData.CreateGround({
            width: this.size,  height: this.size, subdivisions: 1
        });
        vd.applyToMesh(this, false);

        this.material
    }

}