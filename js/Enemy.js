class Enemy extends GameObject{

    constructor(game) {
        super(game);

        // An enemy belongs to a line (picked random at the start)
        this.line = 0; // get random here

        this.position = new BABYLON.Vector3(0,0,0);

        this.isVisible = true;

        // A cell is a squared plane
        let vd = BABYLON.VertexData.CreateSphere({diameter: 1});
        vd.applyToMesh(this, false);

        this.material = new BABYLON.StandardMaterial("", this.getScene());
        this.material.diffuseColor = BABYLON.Color3.Red();
    }

}