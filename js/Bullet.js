class Bullet extends GameObject{

    constructor (game, position) {
        super(game);
        this.position = position;

        // A bullet is a simple sphere
        let vd = BABYLON.VertexData.CreateSphere({diameter: 0.1});
        vd.applyToMesh(this, false);

    }
}