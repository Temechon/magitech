class Tower extends GameObject{

    constructor(game) {
        super(game);

        this.position = BABYLON.Vector3.Zero();

        this.isVisible = true;

        // The current cell of the tower. Null at start because the tower is not placed
        this.cell = null;

        // A cell is a squared plane
        var vd = BABYLON.VertexData.CreateBox({width:1, height:2, depth:1});
        vd.applyToMesh(this, false);
    }


    /**
     * Display debug information on the screen
     * @returns {string}
     */
    debug() {
        return "TOWER 1";
    }

    /**
     * Link the given cell to this tower
     * @param cell
     */
    linkCell(cell) {
        this.cell = cell;
        this.cell.linkTower(this);
    }

    /**
     * Unlink the cell from this tower
     */
    unlinkCell() {
        if (this.cell) {
            this.cell.unlinkTower();
        }
        this.cell = null;
    }

}