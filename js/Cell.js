class Cell extends GameObject{

    constructor(game, line) {
        super(game);

        this.position = BABYLON.Vector3.Zero();
        this.size = 1;

        // A cell belongs to a line
        this.line = line;

        // The tower on this cell
        this.tower = null;

        this.isVisible = true;

        // A cell is a squared plane
        var vd = BABYLON.VertexData.CreateGround({
            width: this.size,  height: this.size, subdivisions: 1
        });
        vd.applyToMesh(this, false);

        this.material = new BABYLON.StandardMaterial("", this.getScene());
    }

    /**
     * Link the given tower to this cell.
     * Only one tower can be found on a cell
     * @param tower
     */
    linkTower(tower) {
        this.tower = tower;
    }

    /**
     * Unlink the tower from this cell
     */
    unlinkTower() {
        this.tower = null;
    }

}