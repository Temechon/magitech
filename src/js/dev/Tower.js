class Tower extends GameObject{

    constructor(game) {
        super(game);

        this.position = BABYLON.Vector3.Zero();

        this.isVisible = true;

        // A cell is a squared plane
        var vd = BABYLON.VertexData.CreateBox({width:1, height:2, depth:1});
        vd.applyToMesh(this, false);


    }

}